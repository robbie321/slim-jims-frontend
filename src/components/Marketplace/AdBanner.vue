<template>
  <div class="banner">
    <!-- OFFERS -->
    <v-carousel cycle height="100" hide-delimiters show-arrows-on-hover>
      <v-carousel-item v-for="(slide, i) in slides" :key="i">
        <v-sheet :color="colors[i]" height="100%">
          <div class="text-h2">{{ slide }}</div>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  data: () => ({
    colors: ["black", "black", "black"],
    slides: ["10% off first order", "Free shipping over €40", "SALE AUG 24TH"],
  }),
};
</script>

<style scoped>
.banner {
  margin-top: 20px;
}
.text-h2 {
  margin-top: 22px;
  color: rgb(205, 155, 240);
  font-size: 4vh !important;
  font-weight: bold;
  text-align: center;
}

@media screen and (max-width: 850px) {
  .text-h2 {
    padding-top: 10px;
  }

  .banner {
    margin: 0px 20px 20px 20px;
  }
}
</style>
