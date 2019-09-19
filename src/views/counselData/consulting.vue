<template>
    <div class="chart-container">
        <el-row>
            <div id="consulting" style="width: 100%; height: 450px"></div>
        </el-row>
    </div>
</template>

<script>
    import echarts from 'echarts'
    export default {
        name: "consulting",
        data(){
            return{
                consulting: null
            }
        },
           methods:{
          drawPieChart(){
              this.chartPie = echarts.init(document.getElementById('consulting'));
              this.chartPie.setOption({
                  title:{
                      text:'用户咨询数据',
                      x: 'left'
                  },
                  legend:{
                    orient: 'vertical',
                      x: 'right'
                  },
                  tooltip:{},
                  dataset: {
                      dimensions: ['product', '咨询数据'],
                      source: [
                          {product: '00:00--03:59', '咨询数据': 43.3},
                          {product: '04:00--07:59', '咨询数据': 83.1},
                          {product: '08:00--11:59', '咨询数据': 56.4},
                          {product: '12:00--15:59', '咨询数据': 72.4},
                          {product: '16:00--19:59', '咨询数据': 33.4},
                          {product: '20:00--23:59', '咨询数据': 92.4},
                      ]
                  },
                  xAxis: {type: 'category'},
                  yAxis: {},

                  series: [

                      {type: 'bar'}
                      ]

              })

              },

               drawCharts(){
                   this.drawPieChart()

          },

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
        height: 500px;
        border-bottom: solid 2px #0000002e;
        margin: auto;
        padding: 33px 0px 0px 0px;

    }

    .el-row{
        width: 70%;
        margin: 0 auto;
    }
</style>