<template>
  <div>
    <div class="orders" v-for="order in orders" :key="order.orderid">
      <h3>
        Order #
        {{ order.orderId }}
      </h3>
      <div class="items" v-for="item in order.items" :key="item.itemid">
        <div class="order row">
          <div class="col-25">
            {{ item.name }}
          </div>

          <div class="col-25">€{{ item.price }}</div>
        </div>
      </div>
      <hr />

      <br />
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

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -16px;
}

.col-25 {
  flex: 25%;
}

.col-50 {
  flex: 50%;
}

.col-75 {
  flex: 75%;
}

.col-25,
.col-50,
.col-75 {
  padding: 0 16px;
}
</style>
