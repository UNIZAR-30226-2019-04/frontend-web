<template>
  <div>
    <b-form-group
      :label="title"
      label-for="basicCheckboxes"
      :label-cols="3"
      vertical>
      <b-form-checkbox-group stacked id="basicCheckboxes" name="Checkboxes" :plain="true">
        <b-form-checkbox v-if="show || index < 4" v-for="(option,index) in options"
                         :value="index"
                         :key="index"
                         v-on:change="catSel(option.nombre)"
        >{{option.nombre}}
        </b-form-checkbox>
      </b-form-checkbox-group>
    </b-form-group>
    <b-button v-if="show" class="btn-link" v-on:click="showMore()"
              style="font-size: 0.9rem; text-decoration: none; background-color: #f0f3f5; color:black">Mostrar menos
    </b-button>
    <!--<b-button v-if="show" class="btn-link" v-on:click="showMore()">Mostrar menos</b-button>-->
    <b-button v-else class="btn-link" v-on:click="showMore()"
              style="font-size: 0.9rem; text-decoration: none; background-color: #f0f3f5; color:black ">Mostrar más
    </b-button>
    <!--<b-button v-else class="btn-link" v-on:click="showMore()">Mostrar más</b-button>-->
  </div>
</template>

<script>
  export default {
    name: "RadioGroup",
    data() {
      return {
        show: false
      }
    },
    props: {
      options: Array,
      title: String
    },
    methods: {
      showMore: function () {
        this.show = !this.show;
      },
      methods: {
         showMore :function () {
           this.show = !this.show;
         },
        catSel : function (option) {
           console.log(option);
           this.$emit('nuevo-tag', option, 'cat');
        }
      }
    }
  }
</script>

<style scoped>

</style>
