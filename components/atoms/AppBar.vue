<template>
  <v-app-bar
    app
    flat
    outlined
    dark
    height="80"
    color="primary"
    class="elevation-5 app-bar"
  >
    <v-row
      class="mx-auto"
      style="max-width: 800px;"
    >
      <v-col cols="12" class="d-flex justify-space-between align-center">
        <h2 class="app-bar-title">
          Wasteye
        </h2>
        <div class="d-flex">
          <v-btn
            to="/"
            class="mr-2"
            text
          >
            폐기물 지도
          </v-btn>
          <v-btn text to="/CCTV">
            CCTV 현황
          </v-btn>
        </div>
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
