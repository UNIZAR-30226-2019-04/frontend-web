<template>
  <b-container fluid>
    <div>
      <b-row>
        <b-col cols="2"><filters></filters></b-col>
        <b-col>
          <b-btn v-for="(tag, index) in tags" style="margin-right: 4px" :key="index" v-on:click="deleteTag(index)">{{tag.tag}}</b-btn>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
    import Filters from "../../components/Filters";
    export default {
        name: "Search",
      components: {Filters},
      data() {
          return {
            tags: [
              {tag: 'Telefonía'},
              {tag: 'Nuevo'},
              {tag: 'Subasta'},
              {tag: '50 km'}
            ]
          }
      },
      methods: {
          deleteTag : function (id) {
            this.tags.splice(id, 1);
          }
      }
    }
</script>

<style scoped>

</style>
