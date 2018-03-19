import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Clinic from 'clinic';
import Login from './Login';
import Register from './Register';
import { Home, Appointment, Contact } from 'client'

export default () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/appointment" component={Appointment} />
        <Route path="/contact" component={Contact} />
        <Route path="/login" component={Contact} />
        <Route exact path="/clinic" render={() => <Redirect to="/clinic/status" />} />
        <Route path="/clinic/:type" component={Clinic} />
      </Switch>
    </Router>
  )
}