<template>
  <h4>{{msg}}</h4>
</template>

<script>
  import moment from "moment";
    export default {
        name: "CountdownTimer",
      props: {
          endTime: {
            day: Number,
            month: Number,
            year: Number
          }
      },
      data() {
          return {
            msg: ''
          }
      },
      created: function(){
        this.timeLeft();
        this.timer = setInterval(this.timeLeft, 1000);
      },
      methods:{
        timeLeft: function (inp) {
          var a = moment([this.endTime.year, this.endTime.month, this.endTime.day+1]);
          var b = moment([]);
          var c = a.diff(b);// 86400000
          // rest.days = Number((c).toFixed(0));
          // b = (c-rest.days)*24;
          // rest.hours = Number((b).toFixed(0));
          // b = (b-rest.hours)*60;
          // rest.mins = Number((b).toFixed(0));
          // b = (b-rest.mins)*60;
          // rest.secs = Number((b).toFixed(0));
          let dd = moment.duration(c).as('days');
          dd = Number((dd).toFixed(0));
          let hh = moment.duration(c).as('hours') % 24;
          hh = Number((hh).toFixed(0));
          let mm = moment.duration(c).as('minutes') % 60;
          mm = Number((mm).toFixed(0));
          let ss = moment.duration(c).as('seconds') % 60;
          ss = Number((ss).toFixed(0));
          let msg2 = dd + ' día(s) ' + hh + ' hora(s) ' + mm + ' minuto(s) ' + ss + ' segundo(s).';
          this.msg = msg2;
        }
      }
    }
</script>

<style scoped>

</style>
