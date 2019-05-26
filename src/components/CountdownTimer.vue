<template>
  <div>
    <b-btn v-on:click="resta">Time count</b-btn>
    <h3>{{msg}}</h3>
  </div>
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
        msg: '',
        kk: null,
      }
    },
    created: function () {
      this.timeLeft();
      this.timer = setInterval(this.timeLeft, 1000);
    },
    methods: {
      resta(){
        var end = moment([this.endTime.year, this.endTime.month - 1, this.endTime.day, this.endTime.hour, this.endTime.min, 0]);
        var fecha = moment(end).format("dddd, MMMM Do YYYY, h:mm:ss a");
        console.log(fecha);
      },
      timeLeft: function (inp) {
        var actualDate = new Date();
        var end = moment([this.endTime.year, this.endTime.month - 1, this.endTime.day, this.endTime.hour, this.endTime.min, 0]);
        // var current = moment([actualDate.getFullYear(), actualDate.getMonth()+1, actualDate.getDate()]);
        var current = moment(actualDate);
        var timeGap = end.diff(current);
        let dd = moment.duration(timeGap).as('days');
        dd = Math.floor(dd);
        let hh = moment.duration(timeGap).as('hours') % 24;
        hh = Math.floor(hh);
        let mm = moment.duration(timeGap).as('minutes') % 60;
        mm = Math.floor(mm);
        let ss = moment.duration(timeGap).as('seconds') % 60;
        ss = Math.floor(ss);
        let msg2 = dd + ' día(s) ' + hh + ' hora(s) ' + mm + ' minuto(s) ' + ss + ' segundo(s).';
        if(moment(current).isBefore(end) > 0){
          this.msg = msg2;
        }
        else{
          this.msg = 'La subasta ha expirado';
        }
      }
    }
  }
</script>

<style scoped>

</style>
