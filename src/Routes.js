import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import Clinic from 'clinic'
import Profile from 'client/components/profile'
import Login from './Login'
import Register from './Register'
import Home from 'client'

export default () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route exact path="/register" render={() => <Redirect to="/register/new" />} />
        <Route path="/register/:id" component={Register} />
        <Route path="/clinic/:id/type/:type" component={Clinic} />
        <Route path="/clinic/:id" component={Clinic} />
        <Route exact path="/profile/:id" render={(props) => <Redirect to={`/profile/${props.match.params.id}/type/book`} />} />
        <Route path="/profile/:id/type/:type" component={Profile} />
      </Switch>
    </Router>
  )
}