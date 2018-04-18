import React from 'react';
import { Router, Route, Switch,routerRedux } from 'dva/router';
import dynamic from 'dva/dynamic';

const routers = [
  {
    path:"/form",
    models:()=>[import('./models/form')],
    component:()=>import('./routes/form/subForm')
  },
  {
    path:"/tip",
    component:()=>import('./routes/tip/singleTip')
  },
  {
    path:"/auth",
    component:()=>import('./routes/auth/index')
  },
  {
    path:"/read",
    component:()=>import("./routes/readCms/index")
  },
  {
    path:"/recruit",
    component:()=>import('./routes/recruit'),
    models:()=>[import('./models/recruit')]
  }
];

const {connectedRouter} = routerRedux;
function RouterConfig({ history,app }) {
  return (
    <Router history={history}>
      <Switch>
        {
          routers.map(({path,...dynamics},key)=>(
            <Route exact path={path} key={key} component={
              dynamic({
                app,
                ...dynamics
              })
            }/>
          ))
        }
      </Switch>
    </Router>
  );
}

export default RouterConfig;
