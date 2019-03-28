<template>
  <div>
    <div :id="dropzoneId"
      class="dropzone"
      @dragenter="dragOn"
      @dragover="dragOn"
      @dragleave="dragOff"
      @dragend="dragOff"
      @drop="drop"
      @click="clickUpload">

      <v-icon class="icon-size"
        color="orange" >cloud_upload</v-icon>
    </div>
    <input :id="inputId"
      name="fileUploader"
      type="file"
      @change="fileChanged"
      accept=".do" >

    <v-list two-line>
      <template v-for="(file, i) in files">
        <app-file-item
          v-on:remove="clearFiles"
          :file="file"
          :key="file.name + file.size + i"></app-file-item>
      </template>
    </v-list>

    <v-snackbar
      v-model="snackbar"
      :timeout="snacktime"
      color="error">

      {{ message }}

      <v-btn fab small
        @click="snackbar = false">
        <v-icon small >close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import AppFileItem from './fileItem'

export default {
  data () {
    return {
      inputId: null,
      dropzoneId: null,
      files: null,
      snackbar: false,
      snackTime: 6000,
      message: 'Error!'
    }
  },

  mounted () {
    this.inputId = this._uid + '_fileInput'
    this.dropzoneId = this._uid + '_dropzone'
  },

  methods: {
    getFileInput () {
      return document.getElementById(this.inputId)
    },

    clickUpload () {
      const el = this.getFileInput()
      el.click()
    },

    fileChanged (event) {
      const files = this.getFileInput().files
      this.files = files
      console.log('file', this.files)

      this.readFile(this.files[0])
    },

    setFiles (files) {
      const fileInput = this.getFileInput()
      this.files = files
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
    },

    getDropzone () {
      return document.getElementById(this.dropzoneId)
    },

    dragOn (event) {
      event.preventDefault()
      const dropzone = this.getDropzone()
      dropzone.classList.add('active')
    },

    dragOff (event) {
      event.preventDefault()
      const dropzone = this.getDropzone()
      dropzone.classList.remove('active')
    },

    drop (event) {
      event.preventDefault()
      const dropzone = this.getDropzone()
      dropzone.classList.remove('active')

      if (event.dataTransfer.items) {
        const items = event.dataTransfer.items
        console.log('items', items)

        if (items.length > 1) {
          this.firePageMessage('Too many files!')
          return
        }

        const files = Array.from(items).map(item => {
          if (item.kind !== 'file') {
            this.firePageMessage('That is not a file!')
            return
          }

          const file = item.getAsFile()
          console.log('we got a file', file.name)
          return file
        });

        this.setFiles(files)

      } else {
        const files = event.dataTransfer.files
        console.log('files', files)

        if (files.length > 1) {
          this.firePageMessage('Too many files!')
          return
        }

        Array.from(files).forEach(file => {
          console.log('file', file.name)
        })
      }
    },

    firePageMessage (message) {
      this.snackbar = true
      this.message = message
    }
  },

  components: {
    AppFileItem
  }
}
</script>

<style scoped>
div.dropzone {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px dashed #ff9800;
  border-radius: 1rem;
  min-height: 10rem;
  width: 80%;
  margin: auto;
}

div.dropzone:hover, div.dropzone.active {
  /* box-shadow: 10px 10px 5px #ff9800; */
  border: 2px solid #ff9800;
}

.icon-size {
  font-size: 8rem;
}

input[type="file"] {
  display: none;
}
</style>
