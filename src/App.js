import React, { Component } from 'react';

import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

import useTimeoutDemo from './demo/useTimeout';
import useFetchDemo from './demo/useFetch';
import useThrottleDemo from './demo/useThrottle';
import useDebounceDemo from './demo/useDebounce';
import useCookieStateDemo from './demo/useCookieState';

import './index.less';

class App extends Component {

  render() {
    return (
        <Router>
          <div className = "nav">
            <div className = "left">
              <NavLink  to="/index" activeClassName='cur'>useTimeoutDemo</NavLink>
              <NavLink to="/fetch" activeClassName='cur' >useFetchDemo</NavLink>
              <NavLink to="/useThrottleDemo" activeClassName='cur'>useThrottleDemo</NavLink>
              <NavLink to="/useDebounceDemo" activeClassName='cur'>useDebounceDemo</NavLink>
              <NavLink to="/useCookieStateDemo" activeClassName='cur'>useCookieStateDemo</NavLink>
            </div>
            <div className = "right">
              <Route exact path="/index" component={useTimeoutDemo} />
              <Route exact path="/fetch" component={useFetchDemo} />
              <Route exact path="/useThrottleDemo" component={useThrottleDemo} />
              <Route exact path="/useDebounceDemo" component={useDebounceDemo} />
              <Route exact path="/useCookieStateDemo" component={useCookieStateDemo} />
            </div>
        </div>
      </Router>
    );
  }
}

export default App;
