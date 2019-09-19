<template>
    <div>
        <div class="a1">
            <h1>
                狼的诱惑
                <h2>等爱的玫瑰</h2>
            </h1>

       <pre>我的id号是{{ad}}</pre>
       <pre>这是一片英文{{content}}</pre>
        <pre>任务的结果是：{{tu}}</pre>

            <div class="b1">
         绝地求生
            </div>

            <div class="b2">
                王者荣耀
                <div class="b3">
                    亚瑟
                </div>
            </div>

            <div class="tu">
                大吉大利今晚吃鸡
            </div>

            <div class="c1">
                杀戮的欲望正在高涨
            </div>

        </div>

    </div>
</template>

<script>
    const li ={
       1: '汽车',
        2: '火车',
        4:'摩托车',
    }
    const ze ={
        et : '无敌'
    }

    export default {
        data(){
            return{
              content:'',
                ad: 0,
                tu:''
            }
        },
        mounted(){

        this.axios.get("http://jsonplaceholder.typicode.com/posts").then(body=>{


            this.ad = li[body.data[3].id];

            this.content = body.data[3].body;

            this.tu = body.data[3].title;

            console.log("777",this.ad)

        })


        }

        

    }
</script>

<style lang="scss" scoped>

    $nav-color: #fff;
    $te-font-size:40px;
    $lu-background-color: #000;
    $ho-background-color:#5DF00E;
    $width: 300px;
    $za-float: left;
    $ma-margin-left:50px;
    $ca_color:#F06B0E;
    @mixin zai{
        color: blanchedalmond;
        background-color: deeppink;
        a {
            color: brown;
        }
    }






    .a1{
        margin: 0;
        border: solid 1px black;
        background-color: cornflowerblue;
        height: 100%;
        h1{
            color: #e64242;
            h2{
                color: cyan;
            }
        }

        pre{
            font-size: 20px;
        }


        .b1{
            height: 200px;
            width: $width;
            color: $nav-color;
            font-size: $te-font-size;
            background: $lu-background-color;
            float: $za-float;
        }
        .b2{
            width: $width;
            height: 200px;
            font-size: $te-font-size;
            float: $za-float;
            color:  $ca_color;
            background:  $ho-background-color;
            margin-left: $ma-margin-left;
            >.b3{
                color:#141513;
                font-size:  $te-font-size;
            }
        }

        .tu{
            width: $width;
            height: 250px;
            @include zai;
            float: $za-float;
            font-size: $te-font-size;
            margin-left: 80px;
        }
        .c1{
            @extend .b1;
            border: solid 3px  $ca_color;
            margin: $ma-margin-left;
        }
    }











</style>