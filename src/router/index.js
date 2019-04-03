import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import NotFound from '@/views/Error/404'
import Home from '@/views/Home'
import Intro from '@/views/Intro/Intro'
import Generator from '@/views/Generator/Generator'
import api from '@/http/api'
import store from '@/store'
import { getIFramePath, getIFrameUrl } from '@/utils/iframe'

Vue.use(Router)

const router = new Router({
  mode:'history',
  base: '/history',
  routes: [
    {
      path: '/',
      name: '首页',
      component: Home,
      icon: 'fa fa-home fa-lg',
      children: [
        { 
          path: '', 
          name: '首页', 
          component: Intro,
          meta: {
            icon: 'fa fa-home fa-lg',
            index: 0
          }
        }
      ]
    },
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path: '/404',
      name: 'notFound',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  // debugger
  // 登录界面登录成功之后，会把用户信息保存在会话
  // 存在时间为会话生命周期，页面关闭即失效。
  let userName = sessionStorage.getItem('user')
  if (to.path === '/login') {
    // 如果是访问登录界面，如果用户会话信息存在，代表已登录过，跳转到主页
    if(userName) {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (!userName) {
      // 如果访问非登录界面，且户会话信息不存在，代表未登录，则跳转到登录界面
      next({ path: '/login' })
    } else {
      // 加载动态菜单和路由
      addDynamicMenuAndRoutes(userName, to, from)
      next()
    }
  }
})

/**
* 加载动态菜单和路由
*/
function addDynamicMenuAndRoutes(userName, to, from) {
  // 处理IFrame嵌套页面
  handleIFrameUrl(to.path)
  if(store.state.app.menuRouteLoaded) {
    console.log('动态菜单和路由已经存在.')
    return
  }
  let menuList = [
    {
        id:1,
        name:'采购管理',
        icon:'fa fa-truck fa-lg',
        url:'/purchase/purchase' 
    },
    {
        id:2,
        name:'销售管理',
        icon:'fa fa-pie-chart fa-lg',
        url:'/sell/sell' 
    },
    {
        id:3,
        name:'库存管理',
        icon:'fa fa-database fa-lg',
        children:[
            {   id:3.1,
                name:'入库登记',
                // icon:'fa fa-circle',
                icon:'fa fa-hand-o-right',
                url:'/stock/input' 
            },
            {   id:3.2,
                name:'出库登记',
                icon:'fa fa-hand-o-left',
                // icon:'fa fa-circle',
                url:'/stock/output' 
            },
            {   id:3.3,
                name:'原料库存',
                icon:'fa fa-cube',
                // icon:'fa fa-circle',
                url:'/stock/material' 
            },
            {   id:3.4,
                name:'成品库存',
                icon:'fa fa-cubes',
                // icon:'fa fa-circle',
                url:'/stock/goods' 
            },
            {   id:3.5,
                name:'出入库记录',
                icon:'fa fa-calendar',
                // icon:'fa fa-circle',
                url:'/stock/inorout' 
            },
            {   id:3.6,
                name:'库存盘点',
                icon:'fa fa-pencil-square',
                // icon:'fa fa-circle',
                url:'/stock/check' 
            },
        ],
        url:'' 
    },
    {
        id:4,
        name:'财务管理',
        icon:'fa fa-balance-scale fa-lg',
        url:'/finance/finance' 
    },
    {
        id:5,
        name:'通知管理',
        icon:'fa fa-bell-o fa-lg',
        url:'/notice/notice' 
    },
    {
        id:6,
        name:'基础管理',
        children:[
            {
                id:6.1,
                name:'用户管理',
                icon:'fa fa-user-circle-o',
                url:'/sys/user'
            },
            {
                id:6.2,
                name:'角色管理',
                icon:'fa fa-users',
                url:'/sys/roles'
            },
            {
                id:6.3,
                name:'原料/成品管理',
                icon:'fa fa-hourglass-end',
                url:'/sys/materialandgoods'
            },
            {
                id:6.4,
                name:'客户/供应商资料',
                icon:'fa fa-handshake-o',
                url:'/sys/customerandsupplier'
            },
            {
                id:6.5,
                name:'仓库管理',
                icon:'fa fa-cubes',
                url:'/sys/store'
            },
            {
                id:6.6,
                name:'预警设置',
                icon:'fa fa-warning',
                url:'/sys/warning'
            },
        ],
        icon:'fa fa-cog fa-lg',
        url:''
    },
    {
        id:7,
        name:'统计分析',
        icon:'fa fa-bar-chart fa-lg',
        url:'/statistics/statistics' 
    },
  ]
  // 添加动态路由
  let dynamicRoutes = addDynamicRoutes(menuList)
  // 处理静态组件绑定路由
    handleStaticComponent(router, dynamicRoutes)
    router.addRoutes(router.options.routes)
    // 保存加载状态
    store.commit('menuRouteLoaded', true)
    // 保存菜单树
    store.commit('setNavTree',menuList)
  }
  // api.menu.findNavTree({'userName':userName})
  // .then(res => {
  //   // 添加动态路由
  //   let dynamicRoutes = addDynamicRoutes(res.data)
  //   // 处理静态组件绑定路由
  //   handleStaticComponent(router, dynamicRoutes)
  //   router.addRoutes(router.options.routes)
  //   // 保存加载状态
  //   store.commit('menuRouteLoaded', true)
  //   // 保存菜单树
  //   store.commit('setNavTree', res.data)
  // }).then(res => {
  //   api.user.findPermissions({'name':userName}).then(res => {
  //     // 保存用户权限标识集合
  //     store.commit('setPerms', res.data)
  //   })
  // })
  // .catch(function(res) {
  // })
 


/**
 * 处理路由到本地直接指定页面组件的情况
 * 比如'代码生成'是要求直接绑定到'Generator'页面组件
 */
function handleStaticComponent(router, dynamicRoutes) {
  for(let j=0;j<dynamicRoutes.length; j++) {
    if(dynamicRoutes[j].name == '代码生成') {
      dynamicRoutes[j].component = Generator
      break
    }
  }
  router.options.routes[0].children = router.options.routes[0].children.concat(dynamicRoutes)
}

/**
 * 处理IFrame嵌套页面
 */
function handleIFrameUrl(path) {
  // 嵌套页面，保存iframeUrl到store，供IFrame组件读取展示
  let url = path
  let length = store.state.iframe.iframeUrls.length
  for(let i=0; i<length; i++) {
    let iframe = store.state.iframe.iframeUrls[i]
    if(path != null && path.endsWith(iframe.path)) {
      url = iframe.url
      store.commit('setIFrameUrl', url)
      break
    }
  }
}

/**
* 添加动态(菜单)路由
* @param {*} menuList 菜单列表
* @param {*} routes 递归创建的动态(菜单)路由
*/

function addDynamicRoutes (menuList = [], routes = []) {
 var temp = []
 for (var i = 0; i < menuList.length; i++) {
   if (menuList[i].children && menuList[i].children.length >= 1) {
     temp = temp.concat(menuList[i].children)
   } else if (menuList[i].url && /\S/.test(menuList[i].url)) {
      menuList[i].url = menuList[i].url.replace(/^\//, '')
      // 创建路由配置
      var route = {
        path: menuList[i].url,
        component: null,
        name: menuList[i].name,
        meta: {
          icon: menuList[i].icon,
          index: menuList[i].id
        }
      }
      let path = getIFramePath(menuList[i].url)
      if (path) {
        // 如果是嵌套页面, 通过iframe展示
        route['path'] = path
        route['component'] = resolve => require([`@/views/IFrame/IFrame`], resolve)
        // 存储嵌套页面路由路径和访问URL
        let url = getIFrameUrl(menuList[i].url)
        let iFrameUrl = {'path':path, 'url':url}
        store.commit('addIFrameUrl', iFrameUrl)
      } else {
       try {
         // 根据菜单URL动态加载vue组件，这里要求vue组件须按照url路径存储
         // 如url="sys/user"，则组件路径应是"@/views/sys/user.vue",否则组件加载不到
         let array = menuList[i].url.split('/')
         let url = ''
         for(let i=0; i<array.length; i++) {
            url += array[i].substring(0,1).toUpperCase() + array[i].substring(1) + '/'
         }
         url = url.substring(0, url.length - 1)
         route['component'] = resolve => require([`@/views/${url}`], resolve)
       } catch (e) {}
     }
     routes.push(route)
   }
 }
 if (temp.length >= 1) {
   addDynamicRoutes(temp, routes)
 } else {
   console.log('动态路由加载...')
   console.log(routes)
   console.log('动态路由加载完成.')
 }
 return routes
}

export default router
