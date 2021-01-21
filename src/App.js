import React, { Component } from 'react';

import { BrowserRouter as Router, Route, NavLink, Redirect } from "react-router-dom";

import useTimeoutDemo from './demo/useTimeout';
import useFetchDemo from './demo/useFetch';
import useThrottleDemo from './demo/useThrottle';
import useDebounceDemo from './demo/useDebounce';
import useCookieStateDemo from './demo/useCookieState';
import useStroageStateDemo from './demo/useStroageState';
import useTimerDemo from './demo/useTimer';
import useCreationDemo from './demo/useCreation';
import useEventListenerDemo from './demo/useEventListener';
import usePersistFnDemo from './demo/usePersistFn';
import useInputTargetDemo from './demo/useInputTarget';

import './index.less';

let List = [{
  name: 'useTimeoutDemo',
  com: useTimeoutDemo
},{
  name: 'useFetchDemo',
  com: useFetchDemo
},{
  name: 'useThrottleDemo',
  com: useThrottleDemo
},{
  name: 'useDebounceDemo',
  com: useDebounceDemo
},{
  name: 'useCookieStateDemo',
  com: useCookieStateDemo
},{
  name: 'useStroageStateDemo',
  com: useStroageStateDemo
},{
  name: 'useTimerDemo',
  com: useTimerDemo
},{
  name: 'useCreationDemo',
  com: useCreationDemo
},{
  name: 'useEventListenerDemo',
  com: useEventListenerDemo
},{
  name: 'usePersistFnDemo',
  com: usePersistFnDemo
},{
  name: 'useInputTargetDemo',
  com: useInputTargetDemo
}];

class App extends Component {

  render() {
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
}

export default App;
