import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
/**
 * 
 * hidden: true                   如果设置为true，项目将不会显示在侧栏中(默认为false)
 * activeMenu: '/example/list'    如果设置路径，侧栏将突出显示您设置的路径
 * alwaysShow: true               如果设置为true，将始终显示根菜单
 *                                如果不总是设置show，当项目有多个子路由时，
 *                                它将成为嵌套模式，否则不显示根菜单
 * redirect: noRedirect           如果设置noRedirect，则不会在面包屑中重定向
 * name:'router-name'             名称由<keep-alive>(必须设置!!)使用
 *  meta : {
    roles: ['admin','editor']     控制页面角色(可以设置多个角色)
    title: 'title'                名称显示在侧边栏和面包屑(推荐集)
    icon: 'svg-name'              图标显示在侧栏中
    noCache: true                 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    affix: true                   如果设置为true，则标记将附加在tags-view中
    breadcrumb: false             如果设置为false，则该项将隐藏在breadcrumb中(默认为true)
    activeMenu: '/example/list'   如果设置路径，侧栏将突出显示您设置的路径
  }
 */
export default new Router({
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/index'),
      hidden: true
    },
    {
      path: '/404',
      component: () => import('@/views/error-page/404'),
      hidden: true
    },
    {
      path: '/redirect',
      component: Layout,
      hidden: true,
      children: [
        {
          path: '/redirect/:path*',
          component: () => import('@/views/redirect/index')
        }
      ]
    },
    {
      path: '/',//主页
      component: Layout,
      redirect: '/dashboard',
      children: [{
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: {
          title: '主页',
          icon: 'el-icon-s-home',
          affix: true,
          noCache: true
        }
      }]
    },
    {
      path: '/registerData', // 注册数据
      component: Layout,
      redirect: '/registerData/index',
      children: [
        {
          path: 'index',
          component: () => import('@/views/registerData/index'),
          name: 'registerData',
          meta: { title: '注册数据', icon: 'el-icon-s-flag', noCache: true}
        }
      ]
    },
    {
      path: '/completeData',// 完善数据
      component: Layout,
      redirect: '/completeData/index',
      children: [
        {
          path: 'index',
          component: () => import('@/views/completeData/index'),
          name: 'completeData',
          meta: { title: '完善数据', icon: 'el-icon-s-claim', noCache: true }
        }
      ]
    },
    {
      path: '/authenticationData',// 认证数据
      component: Layout,
      redirect: '/authenticationData/index',
      children: [
        {
          path: 'index',
          component: () => import('@/views/authenticationData/index'),
          name: 'authenticationData',
          meta: { title: '认证数据', icon: 'el-icon-star-on', noCache: true }
        }
      ]
    },
    {
      path: '/shopData',// 商号数据
      component: Layout,
      redirect: '/shopData/index',
      children: [
        {
          path: 'index',
          component: () => import('@/views/shopData/index'),
          name: 'shopData',
          meta: { title: '商号数据', icon: 'el-icon-truck', noCache: true }
        }
      ]
    },
    {
      path: '/terminalData',// 终端数据
      component: Layout,
      redirect: '/terminalData/index',
      children: [
        {
          path: 'index',
          component: () => import('@/views/terminalData/index'),
          name: 'terminalData',
          meta: { title: '终端数据', icon: 'el-icon-mobile-phone', noCache: true }
        }
      ]
    },
    {
      path: '/exigenceData',// 紧急数据
      component: Layout,
      redirect: '/exigenceData/index',
      children: [
        {
          path: 'index',
          component: () => import('@/views/exigenceData/index'),
          name: 'exigenceData',
          meta: { title: '紧急数据', icon: 'el-icon-phone-outline', noCache: true }
        }
      ]
    },
    {
      path: '/counselData',// 建议数据
      component: Layout,
      redirect: '/counselData/index',
      children: [
        {
          path: 'index',
          component: () => import('@/views/counselData/index'),
          name: 'counselData',
          meta: { title: '用户反馈&咨询', icon: 'el-icon-coffee-cup', noCache: true }
        }
      ]
    }
  ]
})