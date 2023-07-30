
<template>
  <div>
    <section>
      <main>
        <div class="container">
				<div class="container align-self-center justify-content-center">
					<p class="title text-center">註冊會員</p>
					<div class="register_form">
						<i class="far fa-user fa-lg mb-5" style="font-size:50px;color:black;"></i>
							<div class="mb-4">
							  <input type="email" class="form-control" v-model="RegisterInfo.username" placeholder="請輸入帳號">
							</div>
							<div class="mb-4">
							  <input type="password" class="form-control" v-model="RegisterInfo.password" placeholder="請輸入密碼">
							</div>
							<div class="mb-4">
								<input type="password" class="form-control" v-model="RegisterInfo.password_conf" placeholder="確認密碼">
							</div>
							 <input @click="registerBtn()" class="reg_btn mb-4" type="button" value="注册會員"/>
						<input @click="toLogin()" class="log_btn" type="button" value="登入會員"/>
					</div>
				</div>
			</div>
      </main>
    </section>
  </div>
</template>

<script>
export default {
    inject:['reload'],
    name: 'Register',
    data() {
      return {
        RegisterInfo: {
          username: '',
          password: '',
          password_conf: ''
        }
        
      }
    },
    methods: {
      toLogin() {
        this.$router.push('/login')
      },
      registerBtn() {
          if(this.validate() == true) {
            const url = '/users/reg'
            this.$axios.post(
              url, 
              this.$qs.stringify(this.RegisterInfo),
              {
                headers: {"content-type": "application/x-www-form-urlencoded"}
              })
            .then(res=>{
              if(res.data.state == 4000) {
                alert("帳號名已被註冊，請重新輸入")
                this.reload();
              }else if(res.data.state == 200){
                alert("註冊成功，即將跳轉至登入頁")
                this.$router.push('/login')
              } else{
                alert("註冊失敗")
              }
            }).catch(err=>{
              console.log("註冊時產生未知的錯誤");
            })
          }else{
            this.reload();
          }
      },
      validate() {
        if(!this.RegisterInfo.username) {
          alert("請輸入帳號");
          return false;
          this.reload();
        }else if(!this.RegisterInfo.password) {
          alert("請輸入密碼");
          this.reload();
          return false;
        }else if(!this.RegisterInfo.password_conf) {
          alert("請再次輸入密碼");
          this.reload();
          return false;
        }else if(this.RegisterInfo.password != this.RegisterInfo.password_conf){
          alert("請輸入相同的密碼");
          this.reload();
          return false;
        }else{
          return true;
        }
      },
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

    .register_form{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 1000px;
      height: 500px;
      background-color: #F0F0F0;

      .form-control{
        width: 360px;
        height: 45px;
        font-size: 16px;
        border-radius: 0;
        box-shadow:none;

        &:focus{
          border-color: #ccc;
          outline: none;
          box-sizing: none;
        }
      }
      .reg_btn{
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

    .log_btn{
      width: 360px;
      height: 45px;
      font-size: 20px;
      letter-spacing: 3px;
      transition: .4s;
      background-color: #FFF;
      color: #000;

      &:hover{
        transition: .4s;
        background-color: rgb(238, 238, 238);
        color: rgb(0, 0, 0);
      }
    }
  }
}
</style>