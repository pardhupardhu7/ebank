import {Switch, Route, Redirect} from 'react-router-dom'

import Login from './components/Login'

import Home from './components/Home'

import NotFound from './components/NotFound'

import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/ebank/login" component={Login} />
    <Route exact path="/" component={Home} />
    <Route exact path="/not-Found" component={NotFound} />
    <Redirect to="/not-Found" />
  </Switch>
)

export default App
