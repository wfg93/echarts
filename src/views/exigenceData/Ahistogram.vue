<template>
    <div class="chart-container">


        <el-row>
            <div id="Ahistogram" style="width:100%; height:450px;"></div>
        </el-row>
    </div>
</template>

<script>

    import {UserUrgentNumberColumnar} from "../../assets/js/api/index";
    import {ERR_OK} from "../../assets/js/common/config";

    import echarts from 'echarts'
    export default {
        name: "ahistogram",
        data(){
            return{
                Ahistogram:null,
                thDEarr:[],
                aTe: 0,


            }
        },

        methods:{

            // drawChartarl(){
            //     this.chartPie = echarts.init(document.getElementById('Ahistogram'));
            //     this.chartPie.setOption({
            //         title: {
            //             text: '紧急数据监控'
            //         },
            //         tooltip: {},
            //         legend: {},
            //         dataset:{
            //
            //           source:[
            //               ['product', '2015', '2016', '2017'],
            //               ['Matcha Latte', 43.3, 85.8, 93.7],
            //               ['Milk Tea', 83.1, 73.4, 55.1],
            //               ['Cheese Cocoa', 86.4, 65.2, 82.5],
            //               ['Walnut Brownie', 72.4, 53.9, 39.1]
            //           ]
            //
            //         },
            //
            //         xAxis: {
            //             type: 'category'},
            //
            //         yAxis:{},
            //
            //         series: [
            //
            //             {type: 'bar'},
            //             {type: 'bar'},
            //             {type: 'bar'}
            //         ]
            //     })
            // },

            async UserUrgentNumberColumnar(){
               try {
                   let res= await UserUrgentNumberColumnar({});
                   if(res.code === ERR_OK){
                       let da = res.data;

                       this.thDEarr = Object.keys(da)
                       let arrAy= [];
                       this.thDEarr.forEach(va=>{
                           arrAy.push(va)
                       })
                       arrAy.sort()
                       let a= arrAy[0];
                       let b= arrAy[1]
                       let c= arrAy[2]
                       let d= arrAy[3]
                       let e= arrAy[4]
                       let f= arrAy[5]
                       let g= arrAy[6]

                       this.chartPie = echarts.init(document.getElementById('Ahistogram'));
                       this.chartPie.setOption({
                           title: {
                               text: '最近七天用户注册量'
                           },
                           tooltip: {},
                           legend: {
                               orient: 'vertical',
                               x: 'right'
                           },
                           dataset:{

                               source:[
                                   ['product', '用户注册量'],
                                   [a, da[a]],
                                   [b, da[b]],
                                   [c, da[c]],
                                   [d, da[d]],
                                   [e, da[e]],
                                   [f, da[f]],
                                   [g, da[g]]
                               ]
                           },

                           xAxis: {
                               type: 'category'},
                           yAxis:{},
                           series: [
                               {type: 'bar'}
                           ]
                       })

                   }

               }catch (e){

                   this.$message.error("服务器出现异常")

               }


            }


        },
        mounted:function () {
            this.UserUrgentNumberColumnar()

        },
        updated:function () {
           this.UserUrgentNumberColumnar()
        }

    }
</script>

<style scoped>
    .chart-container {
        width: 96%;
        height: 519px;
        border-bottom: solid 2px #0000002e;
        margin: 0 auto;
        padding: 33px 0px 0px 0px;

    }
    .el-row {
        width: 80%;
        margin: 0 auto;
    }
</style>