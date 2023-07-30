<template>
  <div>
    <section>
        <main>
            <div class="container">
                <div class="icon">
                    <i class="fas fa-check"></i>
                </div>
                <p class="mb-5">訂單建立成功！</p>
                <router-link :to="'/orderdetail/' + oid"><span>查看訂單詳情</span></router-link>
            </div>
        </main>
    </section>
  </div>
</template>

<script>
export default {
    name: 'OrderCreated',
    data() {
        return {
            oid: ''
        }
    },
    created() {
        this.oid = this.$route.query.oid;
        
    }

}
</script>

<style scoped lang="scss">
.container{
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 81.9vh;
	padding: 100px;
}

main{
	flex:1;
}
.icon{
	position: relative;
	width: 100px;
	height: 100px;
}
.icon::after{
	z-index: -1;
	position: absolute;
	bottom: 20px;
	right: 15px;
	content: '';
	width: 100px;
	height: 100px;
	border-radius: 50%;
	background-color: #D0CDD0;
}
.fa-check{
	z-index: 1;
	font-size: 70px;
	color: #fff;
}
span{	
	font-size: 20px;
	text-decoration:underline;
	color: #518BB5;
}
p{
	font-size: 50px;
	font-weight: 600;
}
</style>