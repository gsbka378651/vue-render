<template>
  <div>
    <main>
        <div class="container">
            <p class="title mb-5">訂單確認</p>
            <div class="return_to mb-5">
                <router-link to="/cart">〈</router-link>
            </div>
            <div class="cart_form">
                <table class="cart-table" width="100%">
                    <thead>
                        <tr>
                            <th width="15%"></th>
                            <th width="35%">商品</th>
                            <th width="15%">單價</th>
                            <th width="15%">數量</th>
                            <th width="20%">金額</th>
                        </tr>
                    </thead>
                    <tbody id="cart-list" class="cart-body">
                        <tr v-for="item in CartList" :key="item.cid">
                            <td><img :src="require('@/assets'+item.image+'all.jpg')" class="img-responsive" />
                            <td>{{item.title}}</td>
                            <td>$<span>{{item.price}}</span></td>
                            <td>{{item.num}}</td>
                            <td>$<span>{{item.price * item.num}}</span></td>
                        </tr>
                    </tbody>
                </table>
                <div class="total-bar mb-5">
                    <div class="row">
                        <div class="col-6">
                            <p id="selectTotal" class="total_price_1">共<span class="all-count">{{CountNum}}</span>件</p>
                            <p id="selectTotal" class="total_price_1">總金額：$<span class="all-price">{{TotalPrice}}</span></p>
                        </div>
                        <div class="col-6">
                            <input type="button" value="建立訂單" @click="CreateOrder()" class="checkout_btn" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
  </div>
</template>

<script>
export default {
    name: 'OrderConfirm',
    data() {
        return {
            CartList: '',
            CountNum: 0,
            TotalPrice: 0,
            cids: '',
            oid: ''
        }
    },
    created() {
        const url = '/carts';
        this.$axios.get(url)
        .then(res=>{
        this.CartList = res.data.data
        console.log(res.data.data);

        let CountNum = 0
        let TotalPrice = 0
        this.CartList.forEach(element => {
            CountNum += element.num
            TotalPrice += element.price * element.num
        });
        this.CountNum = CountNum
        this.TotalPrice = TotalPrice

        // 拼接get參數
        let cids = []
        for (let i = 0; i < this.CartList.length; i++) {
            cids.push("cids="+this.CartList[i].cid)
        }
        cids = cids.toString().replaceAll(',', '&')
        this.cids = cids
        })
    },

    methods: {
        CreateOrder() {
            const url = '/orders/create'
            this.$axios.post(url, this.cids).then(res=>{
                let oid = res.data.data.oid
                this.oid = oid
                this.$router.push('/ordercreated?oid='+ this.oid)
            }).catch(err=>{
                console.log(err);
            })
        }
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

.title{
	text-align: center;
	font-size: 30px;
	font-weight: 600;
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
	content: '返回購物車';
	width: 200px;
	margin-left: 25px;
	font-size: 20px;
	color: #518BB5;
}
.total_top{
	width: 100%;
	height: 83px;
	background-color: #F0F0F0;
	text-align: center;
}
.total_top span{
	line-height: 83px;
	font-weight: 600;
	vertical-align: top;
	letter-spacing: 5px;
}
.total_top span:first-child{
	font-size: 20px;
	margin-right: 30px;
}
.total_top span:nth-child(2){
	font-size: 30px;
}
.img-responsive{
	width: 150px;
	height: 180px;
	margin: 10px;
}
.num-btn {
	width: 30px;
}
input{
	text-align:center
}
.cart-table tbody tr:not(:first-child) {
	border-top: 1px dashed #cccccc;
}
.total-bar .row{
	display: flex;
	align-items: center;
	width: 100%;
	height: 120px;
	background-color: #F0F0F0;
}
.total_price_1, .total_price_2{
	font-size: 25px;
	font-weight: 600;
	letter-spacing: 5px;
	margin-left: 70px;
}
.checkout_btn{
	width: 300px;
    height: 45px;
    font-size: 20px;
    letter-spacing: 3px;
    transition: .4s;
	background-color: #000;
    color: #FFF;
	margin-right: 50px;
}
.checkout_btn:hover{
	transition: .4s;
    background-color: #FFF;
    color: #000;
}
</style>