<template>
    <div class="chart-container">
        <el-row>
            <div id="columnar" style="width:80%; height:450px;"></div>
        </el-row>
    </div>
</template>

<script>

    import {StyleAndBusinessName} from "../../assets/js/api/index";
    import {ERR_OK} from "../../assets/js/common/config"
    import echarts from 'echarts'
    const industry={
        generalService : '综合服务',
        logistics: '物流业',
        manufacturing: '制造业',
        rawMaterial: '原料'
    }
    const HangYun={

        guanyun: '广运',
        hongyun:'鸿运',
        jieyun:'捷运'

    }

    export default {
        name: "columnar",
        data(){
            return{
                columnar:null,
                GeHangYun:[],
                zongGungYun: 0

            }
                },
           methods:{


               async StyleAndBusinessName(){

                   try {
                 let res =await StyleAndBusinessName({});
                 if(res.code ===ERR_OK){


                     this.operations= Object.keys(res.data.generalService)

                       let GuangJieHong=[];
                      //输出各运名字(广运、捷运、鸿运)
                      this.operations.forEach(v=>{

                          GuangJieHong.push(HangYun[v])

                      })

                      let a= GuangJieHong[0];
                      let b =GuangJieHong[1];
                      let c= GuangJieHong[2];


                     //输出业务名字(制造业、综合服务、物流业、原材料)
                     //1、综合
                     //(1)广运
                     let zg=0;
                     zg= res.data.generalService.guanyun

                        //(2)鸿运
                      let zh=0;
                     zh= res.data.generalService.hongyun
                     //(3)捷运
                     let zj= 0;
                     zj =res.data.generalService.jieyun

                     //1、物流
                     //(1)广运
                     let wg=0;
                     wg= res.data.logistics.guanyun

                     //(2)鸿运
                     let wh=0;
                     wh=  res.data.logistics.hongyun
                     //(3)捷运
                     let wj= 0;
                     wj =res.data.logistics.jieyun

                     //1、制造业
                     //(1)广运
                     let zhg=0;
                     zhg= res.data.manufacturing.guanyun

                     //(2)鸿运
                     let zhh=0;
                     zhh=  res.data.manufacturing.hongyun

                     //(3)捷运
                     let zhj= 0;
                     zhj =res.data.manufacturing.jieyun

                      //1、原料
                     //(1)广运
                     let yg=0;
                     yg= res.data.rawMaterial.guanyun

                     //(2)鸿运
                     let yh=0;
                     yh=  res.data.rawMaterial.hongyun
                     //(3)捷运
                     let yj= 0;
                     yj =res.data.rawMaterial.jieyun


                     this.chartPie = echarts.init(document.getElementById('columnar'));
                     this.chartPie.setOption({
                         title:{
                             text: '各行业开通的商号类型占比',
                             x: 'left'
                         },
                         legend: {
                             x:'right'
                         },
                         tooltip: {},
                         dataset: {
                             dimensions: ['product', a, b, c],
                             source: [
                                 {product: '制造业', '广运': zhg, '捷运': zhj, '鸿运': zhh},
                                 {product: '综合服务', '广运': zg, '捷运': zj, '鸿运': zh},
                                 {product: '物流业', '广运': wg, '捷运': wj, '鸿运': wh},
                                 {product: '原材料', '广运': yg, '捷运': yj, '鸿运':  yh}
                             ]
                         },
                         xAxis: {type: 'category'},
                         yAxis: {},

                         series: [
                             {type: 'bar'},
                             {type: 'bar'},
                             {type: 'bar'}
                         ]
                     })


                 }


               } catch (e){

                       this.$message.error("服务器出现异常")

                   }


               },



               drawPieCharts(){

                   this.StyleAndBusinessName()
            }
        },
        mounted:function () {
            this.drawPieCharts()
        },
        updated:function () {
            this.drawPieChart()
        }
    }
</script>

<style scoped>
    .chart-container{
        width: 96%;
        height: 490px;
        border-bottom: solid 2px #0000002e;
        margin: auto;
        padding: 33px 0px 0px 0px;

    }

    .el-row{
        width: 70%;
       margin: 0 auto;

    }
</style>