<template>
  <div>
  <b-form-group
    :label="title"
    label-for="basicCheckboxes"
    :label-cols="3"
    vertical>
    <b-form-checkbox-group stacked id="basicCheckboxes" name="Checkboxes" :plain="true">
      <b-form-checkbox v-if="show || option.value < 4" v-for="option in options" :value="option.value" :key="option.value" >{{option.text}}</b-form-checkbox>
    </b-form-checkbox-group>
  </b-form-group>
    <b-button class="btn-link" v-on:click="showMore()">Mostrar más</b-button>
  </div>
</template>

<script>
    export default {
        name: "RadioGroup",
      data(){
          return{
            show: false
          }
      },
      props: {options: Array,
              title: String
      },
      methods: {
         showMore :function () {
           this.show = !this.show;
         }
      }
    }
</script>

<style scoped>

</style>
