<template>
    <div>
        <section>
            <main>
                <div class="container">
                    <div class="return_to mb-5">
                        <router-link to="/orderInfo">〈</router-link>
                    </div>
                    <table class="cart-table" width="100%">
                    <thead>
                        <tr>
                            <th width="11%"></th>
                            <th width="29%">商品</th>
                            <th width="11%">單價</th>
                            <th width="15%">數量</th>
                            <th width="11%">金額</th>
                        </tr>
                    </thead>
                    <tbody id="cart-list" class="cart-body">
                        <tr v-for="item in orderDetailList" :key="item.id">
                            <td>
                                <!-- ../images/product/correctiontape/1_big.jpg -->
                                <img :src="require('@/assets'+item.image+'1_big.jpg')" style="width:200px;height:200px" />
                            </td>
                            <td>{{item.title}}</td>
                            <td>$<span id="goodsPrice1">{{item.price}}</span></td>
                            <td>{{item.num}}</td>
                            <td>{{item.price * item.num}}</td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </main>
        </section>
    </div>
    
</template>

<script>
export default {
    name: 'OrderDetail',
    data() {
        return {
            orderDetailList: ''
        }
    },
    created() {
        const oidParams = this.$route.params.id
        const url = '/orders/order/detail/' + oidParams

        this.$axios.get(url).then(res=>{
            console.log(res.data.data);
            this.orderDetailList = res.data.data
        }).catch(err=>{
            console.log(err);
        })
    }

}
</script>

<style lang="scss" scoped>
main{
	flex:1;

    .container{
        display: flex;
        flex-direction: column;
        min-height: 81.9vh;

    }
}
.return_to a{
	position: relative;
	font-size: 30px;
	color: #000;
    text-decoration: none;

}
.return_to a::after{
	position: absolute;
	bottom: 7px;
	content: '返回訂單列表';
	width: 200px;
	margin-left: 25px;
	font-size: 20px;
	color: #518BB5;
}
.title{
	text-align: center;
	font-size: 30px;
	font-weight: 600;
}
</style>