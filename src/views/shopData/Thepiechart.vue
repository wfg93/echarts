<template>
    <div class="chart-container">
        <el-row>

            <div id="chartPie" style="width:100%; height:400px;"></div>

        </el-row>
        <el-row>

            <div id="Brokenline" style="width:100%; height:400px;"></div>

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

    import {Number} from "../../assets/js/api/index";
    import {ERR_OK} from "../../assets/js/common/config"
    import {Polyline} from "../../assets/js/api/index"
    const shopType = {
        'total':'总商号量',
        'natural':'自然用户',
        'selfOperated':'自营用户',
    };

    export default {
        name: "thepiechart",
        data() {
            return {
                chartPie: null,
                Brokenline: null,
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
                value: '',
                keys1:[],
                mingCHeng:[],

            }
        },
        methods: {


            // drawPieChart(){
            //     this.chartPie = echarts.init(document.getElementById('chartPie'));
            //     this.chartPie.setOption({
            //         tooltip: {
            //             trigger: 'item',
            //             formatter: "{a} <br/>{b}: {c} ({d}%)"
            //         },
            //         legend: {
            //             orient: 'vertical',
            //             x: 'left',
            //             data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
            //         },
            //         series: [
            //             {
            //                 name:'访问来源',
            //                 type:'pie',
            //                 radius: ['50%', '70%'],
            //                 avoidLabelOverlap: false,
            //                 label: {
            //                     normal: {
            //                         show: false,
            //                         position: 'center'
            //                     },
            //                     emphasis: {
            //                         show: true,
            //                         textStyle: {
            //                             fontSize: '30',
            //                             fontWeight: 'bold'
            //                         }
            //                     }
            //                 },
            //                 labelLine: {
            //                     normal: {
            //                         show: false
            //                     }
            //                 },
            //                 data:[
            //                     {value:335, name:'直接访问'},
            //                     {value:310, name:'邮件营销'},
            //                     {value:234, name:'联盟广告'},
            //                     {value:135, name:'视频广告'},
            //                     {value:1548, name:'搜索引擎'}
            //                 ]
            //             }
            //         ]
            //     })
            //
            // },


           //时间选择下拉框
            shijian(){
                var val = this.value;


                if(val == '选项1'){

                    this.Polyline('最近一周')


                }else if(val == '选项2'){

                    this.Polyline('最近一月')
                    console.log("222")

                }else if(val == '选项3'){

                    this.Polyline('最近一年')
                    console.log("333")

                }

            },


            //总商号用户中自然自营用户占比圆饼图
            async Number() {
                try {
                    let res = await Number({});

                    if (res.code === ERR_OK) {
                        let a = {value:res.data.natural, name:'自然用户'};
                        let b = {value:res.data.selfOperated, name:'自营用户'};
                        let c = {value:res.data.total, name:'总商号量'}
                        let array=[];
                        array.push(a,b,c)//这里使用a变量

                        this.chartPie = echarts.init(document.getElementById('chartPie'));
                        this.chartPie.setOption({
                            title: {
                                text: '总商号用户中，自然、自营用户占比',
                                x: 'center',
                            },

                            tooltip: {
                                trigger: 'item',
                                formatter: "{a} <br/>{b}: {c} ({d}%)"
                            },
                            legend: {
                                orient: 'vertical',
                                x: 'left',
                                data:['自然用户','自营用户','总商号量']
                            },
                            series: [
                                {
                                    name: '访问来源',
                                    type: 'pie',
                                    radius: ['30%', '70%'],
                                    avoidLabelOverlap: false,
                                    label: {
                                        normal: {
                                            show: false,
                                            position: 'center'
                                        },
                                        emphasis: {
                                            show: true,
                                            textStyle: {
                                                fontSize: '20',
                                                fontWeight: 'bold'
                                            }
                                        }
                                    },
                                    labelLine: {
                                        normal: {
                                            show: false
                                        }
                                    },
                                    data: array,
                                },
                            ]
                        })

                    } else {

                    }
                } catch (e) {

                    this.$message.error("服务器出现异常")

                }

            },

            //总商号自然自营增长趋势
            async Polyline(str){

             try {
                 let res = await Polyline({
                     param:str
                 });

                 if(res.code === ERR_OK){
                      //把对象循环出来
                     // Object.keys(res.data.natural).forEach(function(key) {
                     //     console.log("3333",key)
                     //
                     // });

                     //输出日期

                     this.keys1 = Object.keys(res.data.natural);
                     this.keys1.sort()


                     this.mingCHeng = Object.keys(res.data);


                     //输出名字类型
                     let listV=[];

                     //listV.push(this.mingCHeng)
                     this.mingCHeng.forEach(v=>{
                         listV.push(shopType[v]);
                     });


                     //输出自然用户数据
                     let naturalArray = [];
                     this.keys1.forEach(v=>{
                         naturalArray.push(res.data.natural[v]);
                     });


                     //输出自营用户
                    let selfOArray=[];
                     this.keys1.forEach(v=>{
                         selfOArray.push(res.data.selfOperated[v]);
                     });

                     //输出总商号量
                     //输出自营用户
                     let totalArray=[];
                     this.keys1.forEach(v=>{
                         totalArray.push(res.data.total[v]);
                     });




                     this.chartPie = echarts.init(document.getElementById('Brokenline'));
                     this.chartPie.setOption({
                             title: {
                                 text: '自营,自然商号增长趋势',
                             },
                             tooltip: {
                                 trigger: 'axis'
                             },
                             legend: {
                                 data:  listV,
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
                                 data: this.keys1,
                             },
                             yAxis: {
                                 type: 'value'
                             },
                             series: [

                                 {
                                     name: '总商号量',
                                     type: 'line',
                                     stack: '总量',
                                     data: totalArray,
                                 },
                                 {
                                     name: '自然用户',
                                     type: 'line',
                                     stack: '总量',
                                     data: naturalArray,
                                 },
                                 {
                                     name: '自营用户',
                                     type: 'line',
                                     stack: '总量',
                                     data: selfOArray,
                                 }
                             ]
                         }
                     )




                 }
                 // for(var i in res.data.natural) {
                 //     console.log(i,":",res.data.natural[i]);
                 // }

                 // Object.getOwnPropertyNames(res.data.natural).forEach(function(key){
                 //
                 //     console.log(key);

             } catch (e){

                 this.$message.error("服务器出现异常")
             }

            },


            drawCharts() {
               //this.drawPieChart()

                this.Number()
                this.Polyline()
            },


        },
        mounted: function () {
            this.drawCharts()


        },
        updated: function () {
            this.drawCharts()

        }

    }
</script>

<style scoped>

    .chart-container {
        width: 96%;
        height: 420px;
        border-bottom: solid 2px #0000002e;
        margin: auto;

    }

    .el-row {
        width: 40%;
        float: left;
    }

    .el-select{
        width: 130px;
        margin-left: 50px;
    }
</style>