<template>
  <div id="app">
    <TimerTask :time = 10000 :isMilliSecond = 'false'></TimerTask>
  </div>
</template>

<script>
import  TimerTask  from './components/TimerTask.vue'

export default ({
  data(){
    return{

    }
  },
  components:{TimerTask}
})
</script>


<style>


</style>
