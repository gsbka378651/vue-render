<template>
  <div>
    <nav>
      <div class="navbar">
        <div class="loginIcon" :class="{show: showingIcon}">請先登入</div>
        <img @click="toIndex()" class="logo" src="@/assets/image/index/logo.png" alt="">
        <div class="navbar-item">
          <NabBarItem path="/orderinfo">
            <template v-slot:icon>
              <img src="@/assets/image/index/order_info.png" alt="" @click="checkLogin()">
            </template>
            <template v-slot:icon-active>
              <img src="@/assets/image/index/order_info_active.png" alt="">
            </template>
            <template v-slot:nav-bar-item-title>
              <span @click="checkLogin()">訂單查詢</span>
            </template>
          </NabBarItem>
          <NabBarItem path="/cart" >
            <template v-slot:icon>
              <img src="@/assets/image/index/cart.png" alt="" @click="checkLogin()">
            </template>
            <template v-slot:icon-active>
              <img src="@/assets/image/index/cart_active.png" alt="">
            </template>
            <template v-slot:nav-bar-item-title>
              <span @click="checkLogin()">購物車</span>
            </template>
          </NabBarItem>
          <div v-if="!token">
            <NabBarItem path="/login">
              <template v-slot:icon>
                <img src="@/assets/image/index/user_info.png" alt="">
              </template>
              <template v-slot:icon-active>
                <img src="@/assets/image/index/user_info_active.png" alt="">
              </template>
              <template v-slot:nav-bar-item-title>
                <span>登入</span>
              </template>
            </NabBarItem>
          </div>
          <div v-if="token" @click="logout()">
            <NabBarItem>
              <template v-slot:icon>
                <img src="@/assets/image/index/user_info.png" alt="">
              </template>
              <template v-slot:icon-active>
                <img src="@/assets/image/index/user_info_active.png" alt="">
              </template>
              <template v-slot:nav-bar-item-title>
                <span>登出</span>
              </template>
            </NabBarItem>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import NabBarItem from './navbar/NabBarItem.vue'
export default {
  inject:['reload'],
  name: 'NavBar',
  data() {
    return {
      token: '',
      showingIcon: false
    }
  },
  components: {
    NabBarItem
  },
  created() {
    const token = window.localStorage.getItem("token")
    this.token = token


  },
  methods: {
    toIndex() {
      this.$router.push('/index')
    },
    logout() {
      const url = '/users/logout'
      this.$axios.get(url).then(res=>{
        window.localStorage.removeItem('token')
        location.href ="/"
      })
    },
    checkLogin() {
      if(!this.token) {
          this.showingIcon = true
        setTimeout(() => {
          this.showingIcon = false
        }, 1500);

      }
    }
  }
}
</script>

<style scoped lang="scss">
  .navbar{
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 90px;
    background-color: #333333;
    margin-bottom: 29px;

      .loginIcon {
        z-index: 999;
        position: fixed;
        top: 100px;
        right: 25%;
        width: 200px;
        height: 50px;
        line-height: 50px;
        font-size: 14px;
        font-weight: 600;
        text-align: center;
        letter-spacing: 3px;
        color: rgb(148, 55, 47);
        border: 1px solid rgb(221, 157, 157);
        border-radius: 20px;
        background-color: rgb(221, 157, 157);
        opacity: 0;
        transition: opacity 1.5s;
      }

      .loginIcon.show{
        opacity: 1;
      }

    .logo{
      cursor: pointer;
      width: 50px;
      height: 50px;
    }

    .navbar-item{
      display: flex;
    }
  }
</style>
