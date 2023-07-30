<template>
  <div>
    <section>
      <main>
        <div class="container">
          <p class="title">訂單查詢</p>
          <div class="return_to_index mb-5">
            <a href="/">〈</a>
          </div>
          <table class="table mb-5" v-for="item in OrderInfoList" :key="item.oid">
            <thead>
              <tr>
                <th scope="col">訂單編號</th>
                <th scope="col">訂單建立時間</th>
                <th scope="col">總價</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{item.oid}}</td>
                <td>{{(item.orderTime).substr(0, 10)}}</td>
                <td>{{item.totalPrice}}</td>
                <!-- <td><a :href="'/orderdetail/' + item.oid">訂單詳細</a></td> -->
                <td><router-link :to="'/orderdetail/' + item.oid">訂單詳細</router-link></td>
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
  name: 'OrderInfo',
  data() {
    return {
      OrderInfoList: ''
    }
  },
  created() {
    const url = '/orders/order'
    this.$axios.get(url).then(res=>{
      this.OrderInfoList = res.data.data
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

      &:after{
        position: absolute;
        bottom: 7px;
        content: '返回首頁';
        width: 200px;
        margin-left: 25px;
        font-size: 20px;
        color: #518BB5;
      }
    }
    .table{
      background-color: #c5d2dc;
      border-radius: 5px;
      width: 90%;
      
      a{
        font-weight: 600;
        text-decoration: none;
      }
      
    }
  }
}
</style>
