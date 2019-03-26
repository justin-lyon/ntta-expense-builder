<template>
  <v-app dark>
    <v-toolbar app>
      <v-toolbar-title>ntta-expense-builder</v-toolbar-title>
    </v-toolbar>

    <v-content>
      <v-container >
        <v-layout row>
          <v-flex xs12 md8 offset-md2>
            <nuxt />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <v-footer
      fixed
      app
    >
      <span>&copy; {{ thisYear }} </span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  computed: {
    thisYear () {
      return new Date().getFullYear()
    }
  }
}
</script>
