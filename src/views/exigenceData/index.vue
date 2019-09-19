<template>
    <div class="da">

        <monitoring></monitoring>
        <Ahistogram></Ahistogram>

    </div>
</template>

<script>
    import monitoring from './monitoring'
    import  Ahistogram from './Ahistogram'

    export default {
        data(){
            return{
            }
        },
        components:{
            monitoring,
            Ahistogram

        }
    }
</script>

<style lang="scss" scoped>
    .da{

        padding: 10px;
        height: 120%;
        background: #EEF0F3;
    }
</style>