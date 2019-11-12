import React, { Component } from 'react';
import classNames from 'classnames'
import { Link } from 'react-router-dom';
import RouterPath from "./router";

export default class App extends Component {
    constructor(){
        super(...arguments);
        this.state = {
            showMenu:true,
        }
    }
    async componentWillMount(){
        this.setState( { showMenu: !this.state.showMenu } );
    }
    showMenuMobile(){
        this.setState( { showMenu: !this.state.showMenu } );
    }
    render() {
        const url = window.location.pathname;
        return (
            <div id="manage">
                <ul className= { this.state.showMenu ? "sidebar-menu show" : "sidebar-menu hide"}>
                    <div className="side-menu-inner">
                        <li className={url == '/' ? 'active treeview' : 'treeview'}>
                            <Link to={'/'}>
                                <i className="fa fa-home"></i>
                                <span>
                                    {lang.recent_orders}
                                </span>
                            </Link>
                        </li>
                        <li className={url == '/visitor' ? 'active treeview' : 'treeview'}>
                            <Link to={'/visitor'}>
                                <i className="fa fa-tag"></i>
                                <span>
                                    {lang.recent_visitors}
                                </span>
                            </Link>
                        </li>
                        <li className={url == '/stock-tracking' ? 'active treeview' : 'treeview'}>
                            <Link to={'/stock-tracking'}>
                                <i className="fa fa-tasks"></i>
                                <span>
                                    {lang.stock_tracking}
                                </span>
                            </Link>
                        </li>
                        <li className={url == '/pricing-and-support' ? 'active treeview' : 'treeview'}>
                            <Link to={'/pricing-and-support'}>
                                <i className="fa fa-tasks"></i>
                                <span>
                                   {lang.setup_and_help}
                                </span>
                            </Link>
                        </li>
                   </div>
                   <p className="icon-close-menu" onClick={ this.showMenuMobile.bind(this) } > <i className="fa fa-times"></i> </p>
                </ul>
                <div className={classNames("content-manage")}>
                    <div className="menu-mobile" onClick={ this.showMenuMobile.bind(this) }>
                        <i className="fa fa-bars"></i>
                    </div>
                    <RouterPath />
                </div>
            </div>
        );
    }
}

