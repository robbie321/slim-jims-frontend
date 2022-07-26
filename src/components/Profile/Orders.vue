<template>
  <div>
    <div class="orders" v-for="order in orders" :key="order.orderid">
      {{ order.items }}
      <div class="items" v-for="item in order.items" :key="item.itemid">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    orders: Array,
  },
};
</script>

<style scoped></style>
