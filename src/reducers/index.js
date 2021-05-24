import {combineReducers} from 'redux';
import catalogs from './catalogs';
import environment from './environment'
import context from './context';

export default combineReducers({
    catalogs,
    environment,
    context
});