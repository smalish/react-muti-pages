/*
 * @Author: your name
 * @Date: 2020-09-11 15:40:48
 * @LastEditTime: 2020-09-20 20:27:28
 * @LastEditors: yangying01
 * @Description: In User Settings Edit
 * @FilePath: /github/muti-pages-demo/src/pages/about/router/main_page_router.js
 */
const  MainRouterList = [
  {
    path: '/about-1',
    component: () => import(/* webpackChunkName: "page2-1" */ '../views/about1'),
    meta:{
      title:'about-1'
    }, 
  },
  {
    path: '/about-2',
    component: () => import(/* webpackChunkName: "page2-2" */ '../views/about2'),
    meta:{
      title:'about-2'
    }, 
  }
  
] 
MainRouterList.map((item, index) => {
  var meta = Object.assign({auth: true},item.meta)
  return Object.assign(item,{meta})
})
export default MainRouterList;