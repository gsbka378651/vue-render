import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Index = () => import('@/views/Index.vue')
const OrderInfo = () => import('@/views/OrderInfo.vue')
const Cart = () => import('@/views/Cart.vue')
const Login = () => import('@/views/Login.vue')
const Register = () => import('@/views/Register.vue')
const Product = () => import('@/views/Product.vue')
const OrderConfirm = () => import('@/views/OrderConfirm.vue')
const orderCreated = () => import('@/views/orderCreated.vue')
const orderDetail = () => import('@/views/orderDetail.vue')
const NotFound = () => import('@/views/NotFound.vue')

const routes = [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/index',
    component: Index,
    meta:{
        title: '首頁',
    },
    beforeEnter: (to, from, next)=>{
      if (to.meta.title) {
        document.title = to.meta.title;
      }
      next()
    }
  },
  {
    path: '/orderinfo',
    component: OrderInfo,
    meta:{
      title: '訂單查詢',
    },
    beforeEnter: (to, from, next)=>{
      const tokestr = window.localStorage.getItem("token")
      if(tokestr) {
        next()
      }else{
        return next("/login")
      }
      if (to.meta.title) {
        document.title = to.meta.title;
      }
    }
  },
  {
    path: '/cart',
    component: Cart,
    meta:{
      title: '購物車',
    },
    beforeEnter: (to, from, next)=>{
      const tokestr = window.localStorage.getItem("token")
      if(tokestr) {
        next()
      }else{
        return next("/login")
      }
      if (to.meta.title) {
        document.title = to.meta.title;
      }
    }
  },
  {
    path: '/login',
    component: Login,
    meta:{
      title: '登入',
    },
    beforeEnter: (to, from, next)=>{
      if (to.meta.title) {
        document.title = to.meta.title;
      }
      next()
    }
  },
  {
    path: '/register',
    component: Register,
    meta:{
      title: '註冊',
    },
    beforeEnter: (to, from, next)=>{
      if (to.meta.title) {
        document.title = to.meta.title;
      }
      next()
    }
  },
  {
    path: '/product/:id',
    component: Product,
    meta:{
      title: '商品頁',
    },
    beforeEnter: (to, from, next)=>{
      if (to.meta.title) {
        document.title = to.meta.title;
      }
      next()
    }
  },
  {
    path: '/orderconfirm',
    component: OrderConfirm,
    meta:{
      title: '確認訂單',
    },
    beforeEnter: (to, from, next)=>{
      if (to.meta.title) {
        document.title = to.meta.title;
      }
      next()
    }
  },
  {
    path: '/ordercreated',
    component: orderCreated,
    meta:{
      title: '訂單完成',
    },
    beforeEnter: (to, from, next)=>{
      if (to.meta.title) {
        document.title = to.meta.title;
      }
      next()
    }
  },
  {
    path: '/orderdetail/:id',
    component: orderDetail,
    meta:{
      title: '商品詳情',
    },
    beforeEnter: (to, from, next)=>{
      const tokestr = window.localStorage.getItem("token")
      if(tokestr) {
        next()
      }else{
        return next("/login")
      }
      if (to.meta.title) {
        document.title = to.meta.title;
      }
    }
  },
  {
    path: '/*',
    component: NotFound
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  mode: 'hash',
  routes
})

const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch((err) => err)
}

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}


export default router
