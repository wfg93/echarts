<template>
    <div class="chart-container">
        <el-row>

            <div id="Piechart" style="width:100%; height:400px;"></div>

        </el-row>
        <el-row>

            <div id="Brokenlineo" style="width:100%; height:400px;"></div>

        </el-row>

        <!--时间下拉框-->
        <el-select v-model="value" filterable
                   placeholder="请选择时间" @change="shijian()">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>


    </div>
</template>

<script>

    import echarts from 'echarts'

    import {PromotionPercentage} from "../../assets/js/api/index";
    import {ERR_OK} from "../../assets/js/common/config";
    import {PromotionPolyline} from "../../assets/js/api/index"

    const nameofthe = {

        'marketing':'市场推广',
        'webPromotion':'网络推广'
    }

    export default {
        name: "thelinechart",
        data(){
            return{
                Piechart: null,
                Brokenline: null,
                Thedateof: [],
                Theoutputtype:[],
                options: [{
                    value: '选项1',
                    label: '一周内数据'
                }, {
                    value: '选项2',
                    label: '一月内数据'
                }, {
                    value: '选项3',
                    label: '一年内数据'
                }],
                value:''

            }
        },
        methods:{

            //时间查询
            shijian(){
                var val = this.value;

                if(val == '选项1'){

                    this.PromotionPolyline('最近一周')


                }else if(val == '选项2'){

                    this.PromotionPolyline('最近一月')

                }else if(val == '选项3'){

                    this.PromotionPolyline('最近一年')
                }

            },


              //商号来源占比饼图
            async PromotionPercentage(){

                try{
                    let res = await PromotionPercentage({});

                 if(res.code === ERR_OK ){
                     let a = {value:res.data.marketing, name:'市场推广'};
                     let b = {value:res.data.webPromotion, name:'网络推广'};
                     let array=[];
                     array.push(a,b)
                     this.chartPie = echarts.init(document.getElementById('Piechart'));
                     this.chartPie.setOption({

                             color: ['#285966','#ECCD1A'],
                             title:{
                                 text:'自然商号来源占比',
                                 x: 'center'
                             },
                             legend:{ orient: 'vertical',
                                 x: 'left',
                                 data:['市场推广','网络推广']
                             },
                             tooltip: {
                                 trigger: 'item',
                                 formatter: "{a} <br/>{b}: {c} ({d}%)"
                             },

                             series: [
                                 {
                                     name:'访问来源',
                                     type:'pie',
                                     radius: ['25%', '70%'],
                                     avoidLabelOverlap: false,
                                     label: {
                                         normal: {
                                             show: false,
                                             position: 'right',
                                         },
                                         emphasis: {
                                             show: true,
                                             textStyle: {
                                                 fontSize: '25',
                                                 fontWeight: 'bold',
                                                 color: '#F34409'
                                             }
                                         }
                                     },
                                     labelLine: {
                                         normal: {
                                             show: false
                                         }
                                     },
                                     data: array,
                                 }
                             ]
                         }
                     )
                 }






                }catch(e){

                 this.$message.error("服务器出现异常")
                }

               },

            //商号中市场推广，网络推广增长趋势
            async PromotionPolyline(str){

            try{
               let res= await PromotionPolyline({
                   param:str
               })
                if(res.code === ERR_OK){

                   //输出日期
                this.Thedateof = Object.keys(res.data.marketing);
                let array=[];
                array= this.Thedateof;
                array.sort()

                //类型 (名字)输出
                let typeAry=[];
                this.Theoutputtype = Object.keys(res.data)
                this.Theoutputtype.forEach(va => {
                    typeAry.push(nameofthe[va])

                });

                    //输出市场推广
                     let markArray = [];
                    this.Thedateof.forEach(value =>{
                        markArray.push(res.data.marketing[value])
                    } )
                    //输出网络推广
                    let webpromet = [];
                    this.Thedateof.forEach(value =>{
                        webpromet.push(res.data.webPromotion[value])
                    } )



              this.chartPie = echarts.init(document.getElementById('Brokenlineo'));
               this.chartPie.setOption({
                         title: {
                             text: '市场(网络推广)自然商号增长',
                         },
                         tooltip: {
                             trigger: 'axis'
                         },
                         legend: {
                             data: typeAry,
                             x: 'right'
                         },
                         grid: {
                             left: '3%',
                             right: '4%',
                             bottom: '3%',
                             top: '20%',
                             containLabel: true
                         },
                         xAxis: {
                             type: 'category',
                             boundaryGap: false,
                             data:  array
                         },
                         yAxis: {
                             type: 'value'
                         },
                         series: [

                             {
                                 name:'网络推广',
                                 type:'line',
                                 stack: '总量',
                                 data: webpromet,
                             },
                             {
                                 name:'市场推广',
                                 type:'line',
                                 stack: '总量',
                                 data: markArray,
                             }
                         ]}
                      )

                 }


             } catch (e){

                 this.$message.error("服务器出现异常")
             }
            },

            drawCharts(){

                this.PromotionPercentage()
                this.PromotionPolyline()
            }
        },
        mounted:function () {
            this.drawCharts()
        },
        updated:function () {
            this.drawCharts()
        }

    }
</script>

<style scoped>

    .chart-container{
        width: 96%;
        height: 472px;
        border-bottom: solid 2px #0000002e;
        margin: auto;
        padding: 25px 0px 1px 2px;

    }

    .el-row{
        width: 40%;
        float: left;

    }
    .el-select{
        width: 130px;
        margin-left: 50px;
    }
</style>