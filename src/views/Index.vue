<template>
  <div class="index">
    <section>
      <b-carousel
        id="carousel"
        fade
        :interval="4000"
        controls
        indicators
      >
        <b-carousel-slide :img-src="require('@/assets/image/index/cro1.jpg')"></b-carousel-slide>
        <b-carousel-slide :img-src="require('@/assets/image/index/cro2.jpg')"></b-carousel-slide>
        <b-carousel-slide :img-src="require('@/assets/image/index/cro3.jpg')"></b-carousel-slide>
      </b-carousel>
    </section>
    <main>
    <div class="product-title"><img src="@/assets/image/index/pencil.png" alt="">商品一覽</div>
        <div id="product_list" class="product_list mb-5">
          <div class="product_item" style="width: 18rem;" v-for="item in ProductList" :key="item.id">
              <router-link :to="'product/'+item.id"><img :src="require('@/assets'+item.image+'all.jpg')" class="card-img-top" alt=""></router-link>
              <div class="product_content">
              <p class="product_item_title">{{item.title}}</p>
              <p clsss="product_item_price">＄{{item.price}}</p>
            </div>
          </div>
        </div>
    </main>
    <section>
			<div class="container mb-5">
				<div class="row">
					<div class="col-6 shop_info">
							<div class="shop_title mb-3">店舖位置</div>
							<div class="shop_address">地址：台中市西區公益路68號</div>
							<div class="tel">連絡電話：04 - 23169887</div>
							<div class="shop_hours">營業時間：11：00 ～ 21：30</div>
					</div>
					<div class="col-6">
						<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1820.2921130669533!2d120.66255785652447!3d24.151235394577206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34693d9dd82789cd%3A0x2e2c3778af6649bf!2zNDAz5Y-w5Lit5biC6KW_5Y2A5YWs55uK6LevNjjomZ8!5e0!3m2!1szh-TW!2stw!4v1683920636799!5m2!1szh-TW!2stw" width="600" height="350" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
					</div>
				</div>
			</div>
		</section>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
      return {
        ProductList: '',
      }
  },
  created() {
      this.$axios.get('/products/hot_list')
      .then(res=>{
        this.ProductList = res.data.data
        console.log(res);
      })
  },
}
</script>

<style scoped lang="scss">
  .index{
    .product-title{
      width: 70%;
      height: 70px;
      padding-left: 50px;
      background-color: #333333;
      color: #fff;
      font-size: 27px;
      line-height: 70px;
      margin: 48px auto;

      img{
        width: 35px;
        height: 35px;
        margin-right: 10px;
      }
    }
    .product_list{
      width: 70%;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .product_content p{
        text-align: end;
        font-size: 18px;
        font-weight: 600;
      }
      .shop_title{
        font-size: 40px;
        font-weight: 600;
      }
      .shop_info div{
        margin-bottom: 5px;
      }
      .shop_info div:not(:first-child){
        font-size: 25px;
        margin-left: 40px;
      }
    }

    .shop_info {
      div{
        margin-bottom: 5px;
      }
      div:not(:first-child){
        font-size: 25px;
        margin-left: 40px;
      }
      .shop_title{
        font-size: 40px;
        font-weight: 600;
      }
    }
  }
</style>