<template>
  <div>
    <v-btn large color="orange"
      @click="clickUpload" >
      <v-icon medium >cloud_upload</v-icon>
    </v-btn>
    <input :id="inputId"
      name="fileUploader"
      type="file"
      @change="fileChanged"
      accept=".csv" >

    <v-list two-line>
      <template v-for="(file, i) in files">
        <app-file-item
          v-on:remove="clearFiles"
          :file="file"
          :key="file.name + file.size + i"></app-file-item>
      </template>
    </v-list>
  </div>
</template>

<script>
import AppFileItem from './fileItem'

export default {
  data () {
    return {
      inputId: null,
      files: null
    }
  },

  mounted () {
    this.inputId = this._uid + '_fileInput'
  },

  methods: {
    clickUpload () {
      const el = document.getElementById(this.inputId)
      el.click()
    },

    fileChanged (event) {
      const files = document.getElementById(this.inputId).files
      this.files = files
      console.log('file', this.files)

      this.readFile(this.files[0])
    },

    clearFiles () {
      this.files = null

      const input = document.getElementById(this.inputId)
      input.value = null
      input.files = null
    },

    readFile (file) {
      const reader = new FileReader()
      reader.onload = event => {
        console.log('data', event.target.result)
      }

      reader.readAsText(file)
    }
  },

  components: {
    AppFileItem
  }
}
</script>

<style scoped>
input[type="file"] {
  display: none;
}
</style>
