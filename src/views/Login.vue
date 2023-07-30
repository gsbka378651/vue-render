<template>
  <div>
    <section>
      <main>
        <div class="container align-self-center justify-content-center">
          <p class="title text-center">會員登入</p>
          <div class="login_form">
            <img src="@/assets/image/index/register.png" alt="">
            <div class="login mb-4">
              <div class="mb-4">
                <input type="text" class="form-control" v-model="LoginInfo.username" placeholder="請輸入帳號">
              </div>
              <div class="mb-4">
                <input type="password" class="form-control" v-model="LoginInfo.password" placeholder="請輸入密碼">
              </div>
              <input @click="loginBtn()" class="log_btn" type="button" value="登入會員"/>
            </div>
            <input @click="toRegister()" class="reg_btn" type="button" value="注册會員"/>
          </div>
        </div>
      </main>
	  </section>
  </div>
</template>

<script>
export default {
    inject:['reload'],
    name: 'Login',
    data() {
      return {
        LoginInfo:{
          username: '',
          password: ''
        },
        token: ''
      }
    },
    methods: {
      toRegister() {
        this.$router.push('/register')
      },
      loginBtn() {
        const url = '/users/login'
        this.$axios.post(
          url,
          this.$qs.stringify(this.LoginInfo),
          {
						headers : {"content-type": "application/x-www-form-urlencoded"}
					}
        ).then(res=>{
          if(res.data.state == 5001) {
						alert("帳號不存在，請重新輸入")
						this.reload();
					}else if(res.data.state == 5002){
						alert("密碼錯誤，請重新輸入")
            this.reload();
					}else if(res.data.state == 200) {
            window.localStorage.setItem("token", res.data)
						// alert("登入成功，即將跳轉至首頁")
						// 跳轉到首頁
						// 相對路徑
						location.href = '/'
					}else{
						alert("登入失敗")
					}

        }).catch(err=>{
          alert("登入時產生未知的錯誤")
        })
      }
    },
    created() {
      let token = window.localStorage.getItem("token")
      this.token = token
    }
}
</script>

<style scoped lang="scss">
main{
    flex: 1;

    .container{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 82vh;

      .title{
        font-size: 3.4rem;
        font-weight: 600;
        letter-spacing: 3px;
        margin-bottom: 60px;
      }

      .login_form{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 1000px;
        height: 500px;
        background-color: #F0F0F0;

      img{
        width: 50px;
        margin-block: 33px;
      }

      .login {
        .form-control{
          width: 360px;
          height: 45px;
          font-size: 16px;
          border-radius: 0;
          box-shadow:none;
        }
        input.form-control:focus{
          border-color: #ccc;
          outline: none;
          box-sizing: none;
        }
        .log_btn{
          background-color: #000;
          color: #FFF;

            &:hover{
              transition: .4s;
              background-color: #FFF;
              color: #000;
          }
        }
      }
      .reg_btn, .log_btn{
        width: 360px;
        height: 45px;
        font-size: 20px;
        letter-spacing: 3px;
        transition: .4s;
      }
      .reg_btn{
        background-color: #FFF;
        color: #000;

          &:hover{
            transition: .4s;
            background-color: #eeeeee;
            color: #000;
        }
      }
    }
  }
}
</style>