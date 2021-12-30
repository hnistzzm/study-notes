<template>
    <div class="_base-count-down">
        还剩{{days}}天{{hours}}:{{mins}}:{{seconds}}
    </div>
</template>

<script>
export default {
    data(){
       return{
           days:'0',
           hours:'0',
           mins:'0',
           seconds:'0',
           timer:null,

       } 
    },
    props:{
        time:{
            type:[Number,String],
            default:0
        },
        isMilliSecond:{
            type:Boolean,
            default:false
        }
    },
    computed:{
        duration(){
            //将传递过来的时间参数单位统一转换为秒
            //1.在this.time之前加上'+'号意为将字符串转换成数字(如果传递过来的是字符串的话)
            const time = this.isMilliSecond ? Math.round(+this.time / 1000) : Math.round(+this.time)
            return time
        }
    },
    mounted(){
        this.countDown()
    },
    methods:{
        countDown(){
            this.getTime(this.duration)
        },

        getTime(duration){
            this.timer && clearTimeout(this.timer);
            if (duration < 0) {
                return
            }
            const { dd, hh, mm, ss} = this.durationFormatter(duration)
            this.days = dd || 0
            this.hours = hh || 0
            this.mins = mm || 0
            this.seconds = ss || 0
            this.timer = setTimeout(() => {
                this.getTime(duration - 1)
            }, 1000)
        },
        //将时间转化为天数,小时,分钟,秒
        durationFormatter(time){
            if(!time) return { ss : 0 }
            let t = time
            const ss = t % 60
            t = ( t - ss ) / 60
            if( t < 1) return { ss }
            const mm = t % 60
            t = ( t - mm ) / 60
            if( t < 1) return { ss, mm }
            const hh = t % 24
            t = ( t - hh) / 24
            if( t < 1) return { ss, mm, hh }
            const dd = t
            return { ss, mm, hh ,dd}

        }
    }
}
</script>

<style>

</style>