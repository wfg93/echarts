<template>
    <div class="chart-container">

        <el-row>
            <div id="feedback" style="width:100%; height:450px;"></div>
        </el-row>

        <div class="blook">
            <el-radio-group v-model="radio1" @change="yhFk()">
                <el-radio-button label="投诉"></el-radio-button>
                <el-radio-button label="举报"></el-radio-button>
            </el-radio-group>
        </div>




        <div class="blocka">
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

    import {Complaint} from "../../assets/js/api/index";
    import {ERR_OK} from "../../assets/js/common/config"
    import {Report} from "../../assets/js/api/index";
   const Thenameofthe={
   '1':'假冒商品',
   '2':'违禁商品',
    '3':'违规消息',
    '4':'虚假消息',
    '5':'其他'
  }

    import echarts from 'echarts'
    export default {
        name: "feedback",
        data() {
            return {
                feedback: null,
                hEtk:[],
                radio1: '投诉',
                NaceT:[],
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                },
                value1: '',
            }
        },
        methods: {



            //时间    //返回yyyy-MM-dd HH-mm-ss时间格式
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

            //投诉与举报按钮
            yhFk(){
              var val = this.radio1;
                if(val == '投诉'){
                    this.Complaint();

                }else {
                    this.Report();

                }

            },

            //用户反馈数据投诉
            async Complaint(){

                try {

                    let res = await Complaint({})
                    if( res.code === ERR_OK){

                        let kudrt = res.data.data;

                       this.hEtk = Object.keys(res.data.data)

                       let arrtY=[];
                        Object.keys(kudrt).forEach(key=>{
                            arrtY.push(kudrt[key])
                        })

                        let ae= arrtY[0];
                        let ac= arrtY[0];
                        let ad= arrtY[0];
                        let af= arrtY[0];
                        let ag= arrtY[0];
                        let ah= arrtY[0];



                        let array= [];

                         this.hEtk.forEach(value => {

                         array.push(value)

                        })

                         let a=array[0];
                         let b=array[1];
                         let c=array[2];
                         let d=array[3];
                         let e=array[4];
                         let f=array[5]



                        this.chartPie = echarts.init(document.getElementById('feedback'));
                        this.chartPie.setOption({
                            title: {
                                text: '用户反馈数据',
                                x: 'left'
                            },
                            legend: {

                            },
                            tooltip: {},
                            dataset: {
                                source: [

                                    [a, ae],
                                    [b, ac],
                                    [c, ad],
                                    [d, af],
                                    [e, ag],
                                    [f, ah]
                                ]
                            },
                            xAxis: {type: 'category'},
                            yAxis: {},
                            series: [
                                {type: 'bar'},

                            ]
                        })

                    }




                }catch (e){

                    this.$message.error("服务器连接异常，请稍后再试")
                }


            },

            //用户反馈数据举报
            async Report(){

                try {
                       let res =await Report({});
                       if (res.code === ERR_OK) {

                          this.NaceT = Object.keys(res.data);
                          let kuyZy= res.data

                           let aeeB=[];
                           Object.keys(kuyZy).forEach(key=>{
                              aeeB.push(kuyZy[key])
                           })

                           let ab=aeeB[0];
                           let ac=aeeB[1];
                           let ad=aeeB[2];
                           let ae=aeeB[3];
                           let af=aeeB[4];

                           let arrAy = [];
                          this.NaceT.forEach(value=>{
                           arrAy.push(Thenameofthe[value])

                          })

                           let a= arrAy[0];
                           let b= arrAy[1];
                           let c= arrAy[2];
                           let d= arrAy[3];
                           let e= arrAy[4];

                           this.chartPie = echarts.init(document.getElementById('feedback'));
                           this.chartPie.setOption({
                               title: {
                                   text: '用户反馈数据',
                                   x: 'left'
                               },
                               legend: {},
                               tooltip: {},
                               dataset: {
                                   source: [

                                       [a, ab],
                                       [b, ac],
                                       [c, ad],
                                       [d, ae],
                                       [e, af]
                                   ]
                               },
                               xAxis: {type: 'category'},
                               yAxis: {},
                               series: [
                                   {type: 'bar'},
                               ]
                           })
                       }

                }catch (e){

                    this.$message.error("服务器连接异常，请稍后再试")
                }


            },



            drawCharts() {
               this.Complaint()
                //this.Report()

            }
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
        height: 500px;
        border-bottom: solid 2px #0000002e;
        margin: auto;
        padding: 33px 0px 0px 0px;
    }

    .el-row {
        width: 66%;
        margin: 0 auto;
        float: left;
    }
    .blook{
        width: 10%;
        float: left;
    }

    .blocka {
        width: 16%;
        float: left;
        margin-left: 45px;
    }

</style>