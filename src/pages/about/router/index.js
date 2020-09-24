/*
 * @Author: your name
 * @Date: 2020-09-11 15:40:48
 * @LastEditTime: 2020-09-14 15:11:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /github/muti-pages-demo/src/pages/about/router/index.js
 */
import React from 'react'
import Loadable from 'react-loadable' 
import { HashRouter as Router, Route, Switch,Redirect } from 'react-router-dom'
import MainRouterList from './main_page_router'
const RouterList = [
  ...MainRouterList
] 
function RouterMap() { 
   
    return (
      <Router>
        <Switch> 
          {RouterList.map(route => {  
            var Component = Loadable({
                loader:route.component,
                loading: () => (<div></div>)
            })
            return <Route
                key={route.path}  
                exact
                path={route.path} 
                render={props => { 
                
                  return <Component  {...props}   routes={route.routes}></Component>
              }} 
              />
          })} 
          <Redirect to='/'></Redirect>
        </Switch>
      </Router> 
   )
  } 

export default RouterMap;
