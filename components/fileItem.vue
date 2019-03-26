<template>
  <v-list-tile >
    <v-list-tile-avatar>
      <v-icon>file_copy</v-icon>
    </v-list-tile-avatar>
    <v-list-tile-content>
      <v-list-tile-title v-html="file.name"></v-list-tile-title>
      <v-list-tile-sub-title v-html="size"></v-list-tile-sub-title>
    </v-list-tile-content>
    <v-list-tile-action>
      <v-btn icon ripple @click="$emit('remove', $event)">
        <v-icon>clear</v-icon>
      </v-btn>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
export default {
  props: {
    file: null
  },

  computed: {
    size () {
      const size_mb = (this.file.size / 10000).toFixed(2)
      return size_mb + ' mb'
    }
  }
}
</script>
