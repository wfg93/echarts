<template>
    <div class="chart-container">
        <el-row>
            <div id="mapofchina" style="width:100%; height:550px;"></div>
        </el-row>
        <el-row>
             <div id="diqu">



                 <el-table
                         :data="tableData"
                         border
                         height="550"
                         style="width: 100%">
                     <el-table-column
                             prop="area"
                             label="地区 (省)">
                     </el-table-column>
                     <el-table-column
                             prop="userNum"
                             label="用户数量 (位)">
                     </el-table-column>
                 </el-table>




             </div>
        </el-row>

    </div>
</template>

<script>


    import {UserAdressNumber} from "../../assets/js/api/index";
    import {ERR_OK} from "../../assets/js/common/config"

    import echarts from 'echarts'
    import 'echarts/map/js/china.js'
    export default {
        name: "mapof-china",
        data(){
            return{
                mapofchina: null,
                tableData: [],
                ShengShiqu:[],
                dTu:[],
            }
        },
        methods:{
               //地区用户数量
            async UserAdressNumber(){

                try{

                    let res = await UserAdressNumber({})

                    if(res.code === ERR_OK){
                        let da = res.data;

                        this.ShengShiqu = Object.keys(res.data)



                        // let arryt=[];
                        // arryt= this.ShengShiqu;
                        // arryt.forEach(value => {
                        //     dTu
                        // })

                        this.ShengShiqu.forEach(value => {
                            this.tableData.push({
                                area: value,
                                userNum: da[value],
                            })
                        })
                    }

                }  catch (e){

                    this.$message.error("服务器连接异常，请稍后再试")
                }
            },

            randomData() {

                return Math.round(Math.random()*500);

                let arryut=[];
                this.ShengShiqu.forEach(value => {
                    arryut.push(value)
                    console.log("111",[value])
                    console.log("222",arryut)
                })
                console.log("3333",this.ShengShiqu)
            },


            drawPieChart() {

                var mydata = [
                    {name: '北京',value: this.randomData() },{name: '天津',value:  this.randomData() },
                    {name: '上海',value:  this.randomData() },{name: '重庆',value:  this.randomData() },
                    {name: '河北',value: this.randomData() },{name: '河南',value:  this.randomData() },
                    {name: '云南',value:  this.randomData() },{name: '辽宁',value:  this.randomData() },
                    {name: '黑龙江',value: this.randomData() },{name: '湖南',value: this.randomData() },
                    {name: '安徽',value:  this.randomData() },{name: '山东',value:  this.randomData() },
                    {name: '新疆',value:  this.randomData() },{name: '江苏',value:  this.randomData() },
                    {name: '浙江',value:  this.randomData() },{name: '江西',value:  this.randomData() },
                    {name: '湖北',value:  this.randomData() },{name: '广西',value:  this.randomData() },
                    {name: '甘肃',value:  this.randomData() },{name: '山西',value:  this.randomData() },
                    {name: '内蒙古',value:  this.randomData() },{name: '陕西',value: this.randomData() },
                    {name: '吉林',value:  this.randomData() },{name: '福建',value:  this.randomData() },
                    {name: '贵州',value:  this.randomData() },{name: '广东',value:  this.randomData() },
                    {name: '青海',value:  this.randomData() },{name: '西藏',value:  this.randomData() },
                    {name: '四川',value:  this.randomData() },{name: '宁夏',value:  this.randomData() },
                    {name: '海南',value:  this.randomData() },{name: '台湾',value:  this.randomData() },
                    {name: '香港',value:  this.randomData() },{name: '澳门',value:  this.randomData() }
                ];

                this.chartPie = echarts.init(document.getElementById('mapofchina'));

                this.chartPie.setOption({

                    backgroundColor: '#FFFFFF',
                    title: {
                        text: '中国地图',
                        subtext: '纯属虚构',
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item'
                    },
                    visualMap: {
                        show : false,
                        x: 'left',
                        y: 'bottom',
                        splitList: [
                            {start: 500, end:600},{start: 400, end: 500},
                            {start: 300, end: 400},{start: 200, end: 300},
                            {start: 100, end: 200},{start: 0, end: 100},
                        ],
                        color: ['#66CC33', '#00FF00', '#66FF33','#339900', '#33CC00', '#00CC00']
                    },
                    series: [{
                        name: '真实数据',
                        type: 'map',
                        mapType: 'china',
                        roam: true,
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        data:mydata
                    }]

                })

            },




            drawCharts(){
                this.drawPieChart()
                this. UserAdressNumber()

            }
        },


        mounted:function () {
            this.drawCharts()
            this. randomData()
        },
        updated:function () {
            //this.drawCharts()

        }


    }
</script>

<style scoped>
    .chart-container{
        width: 96%;
        height: 665px;
        border-bottom: solid 2px #0000002e;
        margin: auto;
        padding: 22px 0px 1px 2px;

    }
    .el-row {
        width: 38%;
        float: left;
        margin-left: 116px;
        margin-top: 20px;
    }
    #diqu{
    width: 100%;
    height: 550px;
    border: solid 0.2px #607d8ba8;
     }




</style>