<template>
    <div class="chart-container">
        <div class="yun">
            <ul class="guang hong">
                <li>广运 <span>{{guanyun}}</span></li>
                <li>捷运 <span>{{jieyun}}</span></li>
                <li>鸿运 <span>{{hongyun}}</span></li>
            </ul>

            <ul class="guang zhizao">
                <li>制造业 <span>{{zhiZAoye}}</span></li>
                <li>综合服务 <span>{{zongheFw}}</span></li>
                <li>物流业 <span>{{ wuLiu}}</span></li>
                <li>原材料 <span>{{yuUAncai}}</span></li>
            </ul>


        </div>

        <el-row>
            <div id="PiechartL" style="width:100%; height:400px;"></div>
        </el-row>
        <el-row>
            <div id="BrokenlineZ" style="width:100%; height:400px;"></div>
        </el-row>

    </div>
</template>

<script>

    import {StylePercentage} from "../../assets/js/api/index";
    import {ERR_OK} from "../../assets/js/common/config"
    import {BusinessNameNumber} from "../../assets/js/api/index";
    import echarts from 'echarts'

    const nameArry = {
        'guanyunPercentage': '广运',
        'hongyunPercentage': '鸿运',
        'jieyunPercentage': '捷运'
    }
    const qiyeLieBie = {
        'generalService': '综合服务',
        'logistics': '物流业',
        'manufacturing': '制造业',
        'rawMaterial': '原材料业'
    }


    export default {
        name: "thepiechartfirms",
        data() {
            return {
                PiechartL: null,
                BrokenlineZ: null,
                guanyun: 0,
                hongyun: 0,
                jieyun: 0,
                nametAarY: [],
                Namecombination: [],
                zongheFw: 0,
                wuLiu: 0,
                yuUAncai: 0,
                zhiZAoye: 0
            }
        },
        methods: {


            //商号类别占比
            async StylePercentage() {

                try {

                    let res = await StylePercentage({});
                    if (res.code === ERR_OK) {

                        //商业号占比(广运、鸿运、捷运)
                        this.guanyun = res.data.guanyunPercentage
                        this.jieyun = res.data.jieyunPercentage
                        this.hongyun = res.data.hongyunPercentage


                        //循环对象输出名字
                        let namearY = [];
                        this.nametAarY = Object.keys(res.data)

                        this.nametAarY.forEach(value => {

                            namearY.push(nameArry[value])
                        });

                        let a = {value: this.guanyun, name: '广运'};
                        let b = {value: this.hongyun, name: '鸿运'};
                        let c = {value: this.jieyun, name: '捷运'};


                        let aRray = [];
                        aRray.push(a, b, c)


                        this.chartPie = echarts.init(document.getElementById('PiechartL'));
                        this.chartPie.setOption({
                            title: {
                                text: '商号类别占比',
                                x: 'center'

                            },
                            tooltip: {
                                trigger: 'item',
                                formatter: "{a} <br/>{b}: {c} ({d}%)"
                            },
                            legend: {
                                orient: 'vertical',
                                left: 'left',
                                data: namearY,
                            },
                            series: [
                                {
                                    name: '访问来源',
                                    type: 'pie',
                                    radius: '80%',
                                    label: {
                                        emphasis: {
                                            show: true,
                                            textStyle: {
                                                fontSize: '40'
                                            }
                                        }
                                    },
                                    data: aRray,
                                }
                            ]
                        })
                    }


                } catch (e) {

                    this.$message.error("服务器出现异常")

                }


            },

            //企业类别占比
            async BusinessNameNumber() {
                let res = await BusinessNameNumber({});

                if (res.code === ERR_OK) {

                    //企业类别占比(制造业、综合服务、物流业、原材料)
                    this.zongheFw = res.data.generalService,
                        this.wuLiu = res.data.logistics,
                        this.yuUAncai = res.data.rawMaterial,
                        this.zhiZAoye = res.data.manufacturing

                    //企业类别名称
                    let namettYAn = [];
                    this.Namecombination = Object.keys(res.data)

                    this.Namecombination.forEach(value => {
                        namettYAn.push(qiyeLieBie[value])
                    });

                        let aa = {value: this.zhiZAoye, name: '制造业'};
                        let bb = {value: this.zongheFw, name: '综合服务'};
                        let cc = {value: this.wuLiu, name: '物流业'};
                        let dd = {value: this.yuUAncai, name: '原材料业'};

                        let arrAy= [];
                    arrAy.push(aa,bb,cc,dd)

                    this.chartPie = echarts.init(document.getElementById('BrokenlineZ'));
                    this.chartPie.setOption({
                        title: {
                            text: '企业类别占比',
                            x: 'center'
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}: {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            left: 'left',
                            data: namettYAn,
                        },
                        series: [
                            {
                                name: '访问来源',
                                type: 'pie',
                                radius: ['0%', '80%'],
                                avoidLabelOverlap: false,
                                label: {
                                    emphasis: {
                                        show: true,
                                        textStyle: {
                                            fontSize: '30',
                                        }
                                    }
                                },
                                data: arrAy
                            }
                        ]
                    })
                }
            },


            drawCharts() {
                this.StylePercentage()
                this.BusinessNameNumber()
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

<style lang="scss" scoped>
    .chart-container {
        width: 96%;
        height: 519px;
        border-bottom: solid 2px #0000002e;
        margin: auto;

    }

    .el-row {
        width: 35%;
        float: left;
        margin-left: 59px;

    }

    .yun {
        width: 100%;
        height: 105px;
        display: flex;
        justify-content: space-between;
    }

    .guang {
        padding: 0;
        margin: 0;
        list-style: none;
    }

    .guang > li {
        width: 100px;
        height: 50px;
        border: solid 1px black;
        float: left;
    }

    .hong {
        margin-left: 174px;
        margin-top: 15px;
        line-height: 50px;
        text-align: center;
    }

    .zhizao {
        margin-right: 382px;
        margin-top: 15px;
        line-height: 50px;
        text-align: center;
    }
</style>