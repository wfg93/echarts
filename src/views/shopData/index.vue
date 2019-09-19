<template>
    <div class="da">
      <el-row style="line-height: 36px;">
            <el-col :span="6">
                <div class="grid-content bg-purple">
                <div class="zt">
             <i class="el-icon-orange"></i>
                </div>
                <div class="spa">总商号数据 <span>{{shopTotal}}</span></div>
            </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple-light">
                <div class="zt">
                    <i class="el-icon-phone-outline zr"></i>
                </div>
                <div class="spa zr">自然商号用户 <span>{{natural}}</span></div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                <div class="zt">
                    <i class="el-icon-user zy"></i>
                </div>
                <div class="spa">自营商号用户  <span>{{selfoperated}}</span></div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple-light">
                <div class="zt">
                    <i class="el-icon-loading"></i>
                </div>
                <div class="spa">今日开通商号量  <span>{{nowadays}}</span></div>
                </div>
            </el-col>
        </el-row>



        <thepiechart></thepiechart>
        <thelinechart></thelinechart>
        <thepiechartfirms></thepiechartfirms>
        <columnar></columnar>
        <mapof-china></mapof-china>

    </div>
</template>

<script>

    import Thepiechart from './Thepiechart'
    import Thelinechart from './Thelinechart'
    import Thepiechartfirms from  './Thepiechartfirms'
    import columnar from './columnar'
    import MapofChina from  './MapofChina'
    import {Number} from "../../assets/js/api/index";
    import {ERR_OK} from "../../assets/js/common/config"

    export default {
        data(){
            return{
                shopTotal: 0,
                natural: 0,
                selfoperated: 0,
                nowadays: 0
            }
        },
        components: {
            Thepiechart,
            Thelinechart,
            Thepiechartfirms,
            columnar,
            MapofChina
        },
        mounted() {
            this.Number();
        },

        methods:{
          async Number(){
              try {
                  let res = await Number({});
                  if (res.code === ERR_OK ){
                    this.shopTotal = res.data.total;
                    this.natural = res.data.natural;
                    this.selfoperated = res.data.selfOperated;
                    this.nowadays = res.data.nowadays;

                  }else {


                  }

              }catch (e){

                  this.$message.error("服务器出现异常");

              }



          }


        }




        
    }
</script>

<style lang="scss" scoped>
    .el-row {
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;

        &:last-child {
            margin-bottom: 10px;
            margin-top: 10px;
        }

    }
    .el-col {
        padding: 11px 10px;
        border-radius: 4px;
    }
    .el-col-6{
        width: 20%;

    }

    .bg-purple-dark {
        height: 100px;
        background: #fff;

        text-align: center;
    }
    .bg-purple {
        height: 100px;
        background: #fff;

        text-align: center;
    }
    .grid-content>.spa{
        width: 70%;
        height: 100%;
        background: #00ffff57;
        float: left;
        line-height: 100px;
        font-size: 26px;
        color: #ff9800;
    }
    .bg-purple-light {
        height: 100px;
        background: #fff;

        text-align: center;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
.da{
    padding: 10px;
    height: 308%;
    background: #EEF0F3;
}
.zt{
    width: 30%;
    height: 100%;
    background: cornflowerblue;
    float: left;
}
    .zt>i{
        font-size: 60px;
        line-height: 100px;
        color: #e6e242b5;
    }
    .zt>.zr{
     color: #ffeb3b;
        }
    .zt>.zy{
        color: #1b1d1d;
    }
</style>