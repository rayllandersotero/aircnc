import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'

import Login from './pages/login'
import Dashboard from './pages/dashboard'
import New from './pages/new'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Login} />
                <Route path='/dashboard' component={Dashboard} />
                <Route path='/new' component={New} />
            </Switch>
        </BrowserRouter>
    )
}