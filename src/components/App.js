import React from 'react';
import {Router,Route} from 'react-router-dom';
import history from '../history';

import Cart from './Cart';
import HeaderMenu from './HeaderMenu';
import ChooseEnvironment from './modals/ChooseEnvironment';



const App = (props)=>{


    return(
        <div>
            <Router history={history}>
                <HeaderMenu/>
                <Route path="/" exact component={ChooseEnvironment}/>
                <Route path="/configure" exact component={Cart}/>
            </Router>

        </div>
    );

}

export default App;