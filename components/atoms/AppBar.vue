<template>
  <v-app-bar
    app
    flat
    outlined
    dark
    height="100"
    color="primary"
    class="elevation-5 app-bar"
  >
    <v-row>
      <v-col cols="12">
        <h2 class="app-bar-title">
          Wasteye
        </h2>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppBar'
}
</script>

<style scoped lang="scss">
.app-bar {
  z-index: 200 !important;
}
.app-bar-title {
  letter-spacing: 3.5px;
  font-size: 2em;
}
</style>
