import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isLogin } from '../Utility/Index';

function Privateroute({component:Component ,...rest}) {
    return (
        <Route {...rest} render={props=>(
            isLogin() ?
            <Component {...props}/>
            :
            <Redirect to='/Auth'/>
        )

        }
        />
    );
}

export default Privateroute;