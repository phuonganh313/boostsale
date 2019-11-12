import React, { Component } from 'react';
import Order from './components/order/order';
import Visitor from './components/visitor/visitor';
import StockTracking from './components/stockTracking/stockTracking';
import { Switch, Route } from 'react-router-dom'

export default class RouterPath extends Component{
    render(){   
        return (
            <Switch>
                <Route exact path={'/'} component={Order}/>
                <Route exact path={'/home'} component={Order}/>
                <Route exact path={'/visitor'} component={Visitor}/>
                <Route exact path={'/stock-tracking'} component={StockTracking}/>
            </Switch>
        )
    }
}