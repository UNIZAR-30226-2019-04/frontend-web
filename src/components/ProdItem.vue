<template>
  <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
    <div class="product">
      <router-link to="Profile" class="product-link">
        <div class="product__image">
          <img
            class="img-responsive" src="https://i.ebayimg.com/images/g/NawAAOSwKAJbROBz/s-l300.jpg" alt="">
        </div>
        <div class="product__description">
          <div class="product__info">
            <small>Agasa</small>
            <h4>Gafas</h4>
          </div>
          <div class="product__price-cart">
            $20
          </div>
        </div>
      </router-link>
      <div class="product__action">
        <!--<product-button :product="product" ></product-button>-->
        <b-btn>Comprar</b-btn>
      </div>
    </div>
  </div>
</template>

<script>
  // import ProductButton from './ProductButton.vue'
  export default {
    name: 'product-item',
    props: ['product'],
    // components: {
    //   'product-button': ProductButton
    // }
  }
</script>
<style scoped>

</style>
