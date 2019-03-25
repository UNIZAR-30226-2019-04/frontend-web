<template>
  <div>
    <b-tabs content-class="mt-3" style="margin-top: 20px; margin-left: 5px;">
      <b-tab title="Mis Productos" active style="margin-top: 10px; margin-left: 10px; ">
        <b-card-group columns="true">
          <ProductBox style="margin-bottom: 10px;"></ProductBox>
          <ProductBox style="margin-bottom: 10px;"></ProductBox>
          <ProductBox style="margin-bottom: 10px;"></ProductBox>
          <ProductBox style="margin-bottom: 10px;"></ProductBox>
          <ProductBox style="margin-bottom: 10px;"></ProductBox>
        </b-card-group>
      </b-tab>
      <b-tab title="Mis Reseñas">
        <UserReview></UserReview>
        <UserReview></UserReview>
        <UserReview></UserReview>
        <UserReview></UserReview>
        <UserReview></UserReview>
      </b-tab>
      <b-tab title="Lista de deseos" active style="margin-top: 10px; margin-left: 10px; ">
        <b-card-group columns="true">
          <ProductBox style="margin-bottom: 10px;"></ProductBox>
          <ProductBox style="margin-bottom: 10px;"></ProductBox>
          <ProductBox style="margin-bottom: 10px;"></ProductBox>
          <ProductBox style="margin-bottom: 10px;"></ProductBox>
          <ProductBox style="margin-bottom: 10px;"></ProductBox>
        </b-card-group>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
  import ProductBox from './ProductBox'
  import ProductItem from './ProdItem'
  import UserReview from './UserReview'

  export default {
    name: 'UserTab',
    components: {ProductItem, ProductBox, UserReview}
  }
</script>

<style scoped>

</style>
