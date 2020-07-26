<template>
  <div class="file-list">
    <FileCard
      v-for="(file, i) in files"
      :file="file"
      :key="i"
      :index="i"
      :lastSelected="lastSelected"
      :watcher="files.length % 25 === 0 && i === files.length - 5"
      @dragging="$emit('dragging')"
      @noDragging="$emit('noDragging')"
      @loadNext="$emit('loadNext')"
      @select="fileSelected"
      @shiftSelect="shiftSelected"
      :selected="selectedFileIds.includes(file.id)"
      :loadedAll="loadedAll"
      :drag="drag"
      :zip="zip"
    />
    <div v-if="files.length === 0 && !loadingFiles" class="empty-list">
      <p>No Files in {{ zip ?"Downloads": "Selected" }} Folder</p>
    </div>
    <MultiSelector :selectedFiles="selectedFiles" :zip="zip" v-if="selectedFiles.length" />
    <Spinner v-if="loadingFiles" text="Loading Files..." large />
  </div>
</template>

<script>
import Spinner from '@/components/generic/spinner'
import uniqBy from 'lodash/uniqBy'
import FileCard from './fileCard.vue'
import MultiSelector from './multiSelector'
export default {
  components: {
    FileCard,
    Spinner,
    MultiSelector
  },
  props: {
    files: {
      type: Array,
      required: false,
      default: () => []
    },
    loadedAll: {
      type: Boolean,
      required: false,
      default: () => false
    },
    zip: {
      type: Boolean,
      required: false,
      default: () => false
    },
    loadingFiles: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  data () {
    return {
      selectedFileIds: [],
      selectedFiles: [],
      lastSelected: 0
    }
  },
  methods: {
    drag (e, file) {
      this.$emit('dragging')
      if (this.selectedFileIds.length) {
        if (!this.selectedFileIds.includes(file.id)) {
          this.selectedFiles.push(file)
          this.selectedFileIds = this.selectedFiles.map(f => f.id)
        }
        e.dataTransfer.setData('multipleFiles', JSON.stringify(this.selectedFiles))
      } else {
        e.dataTransfer.setData('fileCard', JSON.stringify(file))
      }
    },
    fileSelected ({ file, index }) {
      if (this.selectedFileIds.includes(file.id)) {
        this.selectedFiles = this.selectedFiles.filter(f => f.id !== file.id)
        this.selectedFileIds = this.selectedFiles.map(f => f.id)
      } else {
        this.selectedFiles.push(file)
        this.selectedFileIds = this.selectedFiles.map(f => f.id)
      }
      this.lastSelected = index
    },
    shiftSelected ({ file, index }) {
      if (this.selectedFileIds.includes(file.id)) {
        if (this.lastSelected > index) {
          const filesInRange = this.files.slice(index, this.lastSelected + 1).map(f => f.id)
          this.selectedFiles = this.selectedFiles.filter(f => !filesInRange.includes(f.id))
        } else {
          const filesInRange = this.files.slice(this.lastSelected, index + 1).map(f => f.id)
          this.selectedFiles = this.selectedFiles.filter(f => !filesInRange.includes(f.id))
        }
      } else if (this.lastSelected > index) {
        this.files.slice(index, this.lastSelected + 1).map((f) => {
          this.selectedFiles.push(f)
        })
      } else {
        this.files.slice(this.lastSelected, index + 1).map((f) => {
          this.selectedFiles.push(f)
        })
        this.selectedFiles = uniqBy(this.selectedFiles, f => f.id)
      }
      this.lastSelected = index
      this.selectedFileIds = this.selectedFiles.map(f => f.id)
    }
  }
}
</script>

<style lang="scss" scoped>
  .file-list{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    min-height: 180px;
  }
</style>
