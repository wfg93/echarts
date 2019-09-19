<template>
    <div class="chart-container">
        <el-row>
            <div id="monitoring" style="width:100%; height:450px;"></div>
        </el-row>





        <div class="block">
            <span class="demonstration">选择时间查看</span><br/>
            <br/>
            <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy-MM-dd"
            @change="getDateHours">
            </el-date-picker>
        </div>



    </div>
</template>
<script>

    import {UserUrgentNumber} from "../../assets/js/api/index";
    import {ERR_OK} from "../../assets/js/common/config";
    import echarts from 'echarts'
    export default {
        name: "monitoring",
        data(){
            return {
                monitoring: null,
                Thedateof: [],
                indexz: [],
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                },
                value1: '',
            }

        },
        methods:{

            //返回yyyy-MM-dd HH-mm-ss时间格式
            getDateHours(myDate) {
                let years = myDate.getFullYear();
                let month = myDate.getMonth() + 1;
                let day = myDate.getDate();

                if (month < 10) {
                    month = "0" + month;
                }
                if (day < 10) {
                    day = "0" + day;
                }

                let times = years + '-' + month + '-' + day;
                //可以赋值给value1

                this.value1 = times


                console.log("4444",times)

                var val = this.value1

                if(val  == times){
                    console.log("333",times)

                  this.UserUrgentNumber(times)

                }

            },


            async UserUrgentNumber(str){

                 try {

                     let res =await UserUrgentNumber({
                         param: str
                     });
                     if(res.code === ERR_OK){

                         let TuaV = res.data

                         //时间表
                         let schedule=[];
                         this.Thedateof= Object.keys(TuaV)
                         schedule =this.Thedateof
                         schedule.sort()
                         let arrty=[];

                          Object.keys(TuaV).forEach(function (key) {
                              // console.log("555",key)
                              // console.log("66666",TuaV[key])
                              arrty.push(TuaV[key])
                          })

                         this.chartPie = echarts.init(document.getElementById('monitoring'));
                         this.chartPie.setOption({
                             title: {
                                 text: '紧急数据监控'
                             },
                             tooltip: {
                                 trigger: 'axis'
                             },
                             legend: {
                                 orient: 'vertical',
                                 data: [ '用户注册量'],
                                 x: 'right'
                             },
                             grid: {
                                 left: '3%',
                                 right: '4%',
                                 bottom: '3%',
                                 containLabel: true
                             },

                             xAxis: {
                                 type: 'category',
                                 boundaryGap: false,
                                 data:  schedule
                             },
                             yAxis: {
                                 type: 'value'
                             },
                             series: [

                                 {
                                     name: '用户注册量',
                                     type: 'line',
                                     stack: '总量',
                                     data: arrty
                                 }
                             ]
                         })

                     }

                 } catch (e){

                     this.$message.error("服务器出现异常")
                 }

            },

          drawPieCharts() {
                    this.UserUrgentNumber()
            }
        },
        mounted:function () {
            this.drawPieCharts()
        },
        updated:function () {
            this.drawPieCharts()
        }
    }
</script>

<style scoped>
    .chart-container{
        width: 96%;
        height: 500px;
        border-bottom: solid 2px #0000002e;
        margin: 0 auto;
        padding: 33px 0px 0px 0px;

    }
    .el-row{
      width: 70%;
     float: left;
    }
    .block{
      width: 16%;
      float: left;
      margin-left: 100px;
    }

</style>