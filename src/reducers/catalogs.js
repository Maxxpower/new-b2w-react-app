import {RETRIEVE_CATALOGS} from '../actions/types';

const initialState = {};

export default (state = initialState,action) =>{
    switch(action.type){
        case RETRIEVE_CATALOGS:
            return {catalogs : action.payload.catalogs,sessionId : action.payload.sessionInfo.Id};
        default:
            return state;
    }
}