<template>
  <v-container grid-list-md fill-height>
    <v-layout row wrap grid-list-xs>
      <v-flex xs12 >
        <v-card>
          <v-card-title>NTTA</v-card-title>
          <v-card-text>
            <p>Login to NTTA and export your transactions for excel.</p>

            <ol>
              <li>Login to NTTA</li>
              <li>Navigate to Account History</li>
              <li>Filter by Date Range</li>
              <li>Click "Download in Excel"</li>
            </ol>

            <p>NTTA Excel export is of file type ".do".</p>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 >
        <v-card>
          <v-card-title>Upload</v-card-title>
          <div class="text-xs-center">
            <app-file-upload
              @fileRead="handleFileRead"></app-file-upload>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex'
import AppFileUpload from '../components/fileUpload'

export default {
  name: 'home',
  data () {
    return {
      file: null,
      content: null
    }
  },

  methods: {
    ...mapMutations( 'transactions', {
      setTransactions: 'setTransactions'
    }),

    handleFileRead (event) {
      console.log('message', event.file)
      const { file, content } = event
      this.file = file
      this.content = content

      const formData = new FormData()
      formData.append('file', file)

      const axiosConfig = {
        headers: {
          'Content-Type': 'multipart/form/data'
        }
      }

      this.$axios.post('/upload', formData, axiosConfig)
        .then(res => {
          console.log('success', res.data)
          this.setTransactions(res.data)
          this.$router.push('/transactions')
        })
        .catch(err => {
          console.error('Error uploading...', err.message)
        })
    }
  },

  components: {
    AppFileUpload
  }
}
</script>
