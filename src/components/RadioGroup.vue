<template>
  <b-form-group
    :label="title"
    label-for="basicCheckboxes"
    :label-cols="3"
    vertical>
    <b-form-checkbox-group stacked id="basicCheckboxes" name="Checkboxes" :plain="true" :checked="[2,3]">
      <b-form-checkbox v-for="option in options" :value="option.value" :key="option.value">{{option.text}}</b-form-checkbox>
    </b-form-checkbox-group>
  </b-form-group>
</template>

<script>
    export default {
        name: "RadioGroup",
      props: {options: Array,
            title: String}
    }
</script>

<style scoped>

</style>
