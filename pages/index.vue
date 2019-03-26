<template>
  <v-container grid-list-md fill-height>
    <v-layout row wrap grid-list-xs>
      <v-flex xs12 >
        <v-card>
          <v-card-title>NTTA</v-card-title>
          <v-card-text>
            Login to NTTA and export your transactions for excel.
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 >
        <v-card>
          <v-card-title>content</v-card-title>
          <div class="text-xs-center">
            <app-file-upload></app-file-upload>
          </div>
        </v-card>
      </v-flex>
      <v-flex xs12 >
        <v-card>
          <v-card-title>content2</v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AppFileUpload from '../components/fileUpload'
export default {
  components: {
    AppFileUpload
  }
}
</script>
