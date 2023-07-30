<template>
  <div>
    <div class="container">
		<p class="title mb-5">購物車</p>
		<div class="return_to_index mb-5">
			<a href="/">〈</a>
		</div>
		<div v-if="cartData.length <= 0" id="noItem">購物車沒有商品</div>
		<div v-else id="cart_form" class="cart_form">
			<table class="cart-table" width="100%">
				<thead>
					<tr>
						<!-- <th width="8%">
							<input id="checkAllBtn" type="checkbox" class="ckall" style="width:20px;height:20px;" checked/>全選
						</th> -->
						<th width="100"></th>
						<th width="29%">商品</th>
						<th width="11%">單價</th>
						<th width="20%">數量</th>
						<th width="11%">金額</th>
						<th></th>
					</tr>
				</thead>
				<tbody id="cart-list" class="cart-body">
					<tr v-for="(item)  in cartData" :key="item.cid">
						<!-- <td>
							<input type="checkbox" class="ckitem"/>
						</td> -->
						<td><img :src="require('@/assets'+item.image+'all.jpg')" class="img-responsive" />
						</td>
						<td>{{item.title}}</td>
						<td>＄<span id="goodsPrice1">{{item.price}}</span></td>
						<td>
							<input type="button" value="-" class="num-btn" @click="subNum(item.cid, item.num)" />
							<input type="text" size="2" readonly="readonly" class="num-text" v-model="item.num">
							<input class="num-btn" type="button" value="+" @click="addNum(item.cid)" />
						</td>
						<td><span id="goodsCast1">{{item.price * item.num}}</span></td>
						<td>
							<input type="button" @click="deleteCartItem(item, item.cid)"
								class="cart-del btn btn-default btn-xs" value="删除" />
						</td>
					</tr>
				</tbody>
			</table>
			<div class="total-bar mb-5">
				<div class="row">
					<div class="col-12">
						<input type="submit" value="確認訂單" @click="confirmBtn()" class="checkout_btn" />
					</div>
				</div>
			</div>
		</div>
	</div>
  </div>
</template>

<script>
export default {
	inject:['reload'],
  name: 'Cart',
  data() {
    return {
      cartData: '',
    }
  },
  created() {

	const url = '/carts'
	this.$axios.post(url).then(res=>{
	this.cartData = res.data.data

	}).catch(err=>{
		console.log(err)
	})
  },
  methods: {
	subNum(cid) {
		const url = "/carts/" + cid + "/num/minus"
		this.$axios.post(url).then(res=>{
			const vm = this._data.cartData
				vm.forEach((item)=>{
				if(item.cid === cid) {
					item.num -= 1
				}
			})
      }).catch(err=>{
        alert("商品數量減少產生未知的異常，" + err)
      })
    },
    addNum(cid) {
		const url = "/carts/" + cid + "/num/add"
       	this.$axios.post(url).then(res=>{
			const vm = this._data.cartData
				vm.forEach((item)=>{
				if(item.cid === cid) {
					item.num += 1
				}
			})
        }).catch(err=>{
          alert("商品數量增加產生未知的異常，" + err)
        })
    },
	deleteCartItem(item, cid){
		this.cartData.splice(item, 1)
		const url = '/carts/delete/' + cid

		this.$axios(url).then(res=>{
			console.log("移除成功");
		}).catch(err=>{
			console.log("移除失敗");
		})
	},
	confirmBtn() {
		this.$router.push('/orderconfirm')
	}
  }
}
</script>

<style scoped>
.container{
	min-height: 81.9vh;
}
main{
	flex: 1;
}
.title{
	text-align: center;
	font-size: 30px;
	font-weight: 600;
}
.return_to_index a{
	position: relative;
	font-size: 30px;
	color: #000;
  	text-decoration: none;
}
#noItem{
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 50px;
	font-weight: 600;
	letter-spacing: 3px;
}
.return_to_index a::after{
	position: absolute;
	bottom: 6px;
	content: '繼續購物';
	width: 200px;
	margin-left: 10px;
	font-size: 20px;
	color: #518BB5;
}
.img-responsive{
	width: 230px;
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
	text-align: end;
	width: 100%;
	height: 120px;
	background-color: #F0F0F0;
}
.total_price_1, .total_price_2{
	font-size: 30px;
	font-weight: 600;
	letter-spacing: 5px;
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
