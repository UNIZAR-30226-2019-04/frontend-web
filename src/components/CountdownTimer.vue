<template>
  <p>{{msg}}</p>
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
          var actualDate = new Date();
          var end = moment([this.endTime.year, this.endTime.month, this.endTime.day]);
          // var current = moment([actualDate.getFullYear(), actualDate.getMonth()+1, actualDate.getDate()]);
          var current = moment([]);
          var timeGap = end.diff(current);
          let dd = moment.duration(timeGap).as('days');
          dd = Number((dd).toFixed(0));
          let hh = moment.duration(timeGap).as('hours') % 24;
          hh = Number((hh).toFixed(0));
          let mm = moment.duration(timeGap).as('minutes') % 60;
          mm = Number((mm).toFixed(0));
          let ss = moment.duration(timeGap).as('seconds') % 60;
          ss = Number((ss).toFixed(0));
          let msg2 = dd + ' día(s) ' + hh + ' hora(s) ' + mm + ' minuto(s) ' + ss + ' segundo(s).';
          this.msg = msg2;
        }
      }
    }
</script>

<style scoped>

</style>
