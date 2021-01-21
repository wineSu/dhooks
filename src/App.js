import React from 'react';
import { 
  BrowserRouter as Router,
  Route,
  NavLink,
  Redirect
} from "react-router-dom";
import * as demo from './demo';
import './index.less';

let moduleList = Object.keys(demo);

const List = moduleList.map(item => ({
  name: item,
  com: demo[item]
}))

const App = () => {
    return (
        <Router>
          <div className = "nav">
            <div className = "left">
              {
                List.map(item => <NavLink to={`/${item.name}`} key = {item.name} activeClassName='cur'>{item.name}</NavLink>)
              }
            </div>
            <div className = "right">
              {
                List.map(item => <Route exact path={`/${item.name}`} key = {item.name} component = {item.com} />)
              }
              <Redirect to="/useTimeoutDemo"/>
            </div>
        </div>
      </Router>
    );
}

export default App;
