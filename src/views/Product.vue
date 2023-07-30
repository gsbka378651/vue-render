<template>
  <div>
    <main>
      <section>
          <div class="addCartIcon" :class="{show: showingAddIcon}">已加入購物車</div>
        	<div class="container">
					<div class="row">
          <div class="col-6 images">
            <div class="img-big mb-2">
							<img :src="imgUrl" />
						</div>
            <div class="img-small">
                <img @click="imageChange(require('@/assets'+ productDetial.image + '1_big.jpg'))" :src="require('@/assets'+ productDetial.image + '1_big.jpg')" />
                <img @click="imageChange(require('@/assets'+ productDetial.image + '2_big.jpg'))" :src="require('@/assets'+ productDetial.image + '2_big.jpg')" />
                <img @click="imageChange(require('@/assets'+ productDetial.image + '3_big.jpg'))" :src="require('@/assets'+ productDetial.image + '3_big.jpg')" />
            </div>
          </div>
						<div class="col-6 p-5 item-info">
							<div id="product_title" class="product_title mb-4">{{productDetial.title}}</div>
							<div id="product_price" class="product_price mb-4">價格：{{productDetial.price}}</div>
              <div v-if="token" class="num_ctrl mb-5">
                <label for="num" class="product_num">數量：</label>
                <input @click="sub()" type="button" value="-" class="num-btn"/>
                <input type="text" size="2" readonly="readonly" class="num-text" v-model="toCardata.amount">
                <input @click="add()" type="button" value="+" class="num-btn"/>
              </div>
              <div class="btn_add">
                <button v-if="token" @click="addToCart()" type="button" class="btn-add-to-cart">加入購物車</button>
                <button v-else @click="toLogin()" type="button" class="btn-add-to-cart">按此登入購買</button>
              </div>
						</div>
					</div>
				</div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Produce',
  data() {
    return {
      token: '',
      id: this.$route.params.id,
      productDetial: '',
      toCardata: {
        pid: this.$route.params.id ,
        amount: 1
      },
      showingAddIcon: false,
      imgUrl: ''
    }
  },
  created() {
      let id = this.$route.params.id
      const url1 = "/products/" + id + "/details"
      this.$axios.get(url1).then(res=>{
        this.productDetial = res.data.data
        this.imgUrl = require('@/assets'+ res.data.data.image + '1_big.jpg')
      })

      let token = window.localStorage.getItem("token")
      this.token = token
  },
  methods: {
    sub() {
      if(this.toCardata.amount > 1) {
        this.toCardata.amount--
      }
    },
    add() {
      if(this.toCardata.amount < 99) {
        this.toCardata.amount++
      }
    },
    addToCart() {
      const url = '/carts/add_to_cart'
      this.$axios.post(
        url, 
        this.$qs.stringify(this.toCardata),
      ).then(res=>{
        this.showingAddIcon = true
          setTimeout(() => {
            this.showingAddIcon = false
        }, 1300)
        // if (res.data.state == 200) {
        //       location.href = '/cart'
				// 		}
      }).catch(err=>{
        alert("加入購物車時產生未知的異常"+err)
        console.log(this.toCardata);
      })
    },
    toLogin() {
      this.$router.push('/login')
    },
    imageChange(img) {
      this.imgUrl = img
    }
  }
}
</script>

<style scoped lang="scss">
  main{
    flex: 1;

    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 81.9vh;

      .images{
        display: flex;
        flex-direction: column;
      }
      .img-small {

        img{
          cursor: pointer;
          width: 100px;

          &:hover{
            border: 1px solid #4288c3
          }
        }
      }

      .item-info {
        display: flex;
        justify-content: center;
        flex-direction: column;

        .product_title{
          font-size: 30px;
        }
        .product_price{
          font-size: 24px;
          font-weight: 600;
        }
        .product_num{
          font-size: 24px;
        }

        .num-btn {
          width: 30px;
          height: 30px;
        }
        .num-text {
          width: 30px;
          height: 30px;
          text-align: center;
          margin: 0 10px;
        }
        .btn_add{

          .btn-add-to-cart{
            width: 360px;
            height: 45px;
            font-size: 20px;
            letter-spacing: 3px;
            transition: .4s;
            background-color: #000;
            color: #FFF;

            &:hover{
              transition: .4s;
              background-color: #FFF;
              color: #000;
            }
          }
        }
      }

      
        .big-show {
        display: block;
      }
    }
    .addCartIcon {
        z-index: 999;
        position: fixed;
        top: 650px;
        right: 29%;
        width: 200px;
        height: 50px;
        line-height: 50px;
        font-size: 14px;
        font-weight: 600;
        text-align: center;
        letter-spacing: 3px;
        color: rgb(60, 84, 138);
        border: 1px solid rgb(157, 177, 221);
        border-radius: 20px;
        background-color: rgb(218, 230, 241);
        opacity: 0;
        transition: opacity 1.5s;
      }

      .addCartIcon.show{
        opacity: 1;
      }
  }


  
</style>