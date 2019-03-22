<template>
  <div>
    <b-tabs content-class="mt-3">
      <b-tab title="Mis Productos" active>
        <b-row>
          <ProductBox></ProductBox>
          <ProductItem></ProductItem>
        </b-row>
      </b-tab>
      <b-tab title="Mis Reseñas" active>
        <UserReview></UserReview>
      </b-tab>
      <b-tab title="disabled" disabled>
        <p>Disabled tab!</p>
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
  components: { ProductItem, ProductBox, UserReview }
}
</script>

<style scoped>
</style>
