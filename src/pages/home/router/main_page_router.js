/*
 * @Author: your name
 * @Date: 2020-09-11 15:40:48
 * @LastEditTime: 2020-09-20 20:27:44
 * @LastEditors: yangying01
 * @Description: In User Settings Edit
 * @FilePath: /github/muti-pages-demo/src/pages/about/router/main_page_router.js
 */
const  MainRouterList = [
  {
    path: '/home-1',
    component: () => import(/* webpackChunkName: "page3-1" */ '../views/home1'),
    meta:{
      title:'home-1'
    }, 
  },
  {
    path: '/home-2',
    component: () => import(/* webpackChunkName: "page3-2" */ '../views/home2'),
    meta:{
      title:'home-2'
    }, 
  }
  
] 
MainRouterList.map((item, index) => {
  var meta = Object.assign({auth: true},item.meta)
  return Object.assign(item,{meta})
})
export default MainRouterList;