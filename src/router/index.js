import Vue from 'vue'
import VueRouter from 'vue-router'

//使用插件VueRouter
Vue.use(VueRouter);

//懒加载
const Home = () => import('@/view/Home/Home.vue');
const Category = () => import('@/view/Category/Category.vue');
const Cart = () => import('@/view/Cart/Cart.vue');
const User = () => import('@/view/User/User.vue');
const Detail = () => import('@/view/Detail/Detail.vue')

import NotFound from '@/components/common/NotFound/NotFound.vue'
//routes是一个数组，存放对象，每一个对象就是一个路由
const routes =[
  {
    path: '',
    redirect: '/home',
  },
  {
    path: '/home',
    component: Home,
    meta:{
      title: '主页'
    }
  },
  {
    path: '/category',
    component: Category, 
    meta:{
      title: '分类'
    }
  },
  {
    path: '/cart',
    component: Cart,
    meta:{
      title: '购物车'
    }
  },
  {
    path: '/user',
    component: User,
    meta:{
      title: '个人'
    }
  },
  {
    //详情页通过动态参数获得各个商品的iid
    path: '/detail:iid',
    component: Detail,
    meta:{
      title: '详情'
    }
  },
  {
    path:'/404',
    component:NotFound,
    meta:{
      title:'404 NotFound'
    }
  },
  {
    path:'*',
    redirect:'/404'
  }
]

const router = new VueRouter({
  routes,
  // 使用history模式，可进可退
  mode:'history'
})

//前置守卫
router.beforeEach((to, from, next) => {
  document.title = to.matched[0].meta.title;
  next();
})
//获取重复点击的错误
const originalPush = VueRouter.prototype.push
      VueRouter.prototype.push = function push(location) {
        return originalPush.call(this, location).catch(err => err)
      }

//记得导出，在main.js中引入使用
export default router