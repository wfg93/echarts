<template>
    <div class="da">
        <feedback></feedback>
        <consulting></consulting>
    </div>
</template>

<script>
    import feedback from './feedback'
    import consulting from './consulting'
    export default {
        data(){
            return{}
        },
        components:{
            feedback,
            consulting
        }
    }
</script>

<style lang="scss" scoped>
    .da{
        padding: 10px;
        height: 115%;
        background: #EEF0F3;
    }
</style>