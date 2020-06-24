import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Dashboard from '../Dashboard';
import Login from '../Login';
import Register from '../Register';
import {Provider} from 'react-redux'
import {store} from '../../../Config/redux'

function App() {
  return (
    <Provider store = {store} >
      <Router>
        <Route path='/' exact component={Login}/>
        <Route path='/dashboard' exact component={Dashboard}/>
        <Route path='/register' component={Register}/>
      </Router>
    </Provider>
  );
}

export default App;
