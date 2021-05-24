import {UPDATE_CONTEXT} from '../actions/types';

const initialState = {};

export default (state = initialState,action) =>{
    switch(action.type){
        case UPDATE_CONTEXT:
            return action.payload;
        default:
            return state;
    }
}