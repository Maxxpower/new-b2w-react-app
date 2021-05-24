import {CHOOSE_ENVIRONMENT} from '../actions/types';

const initialState = {};

export default (state = initialState,action) =>{
    switch(action.type){
        case CHOOSE_ENVIRONMENT:
            return {...action.payload};
        default:
            return state;
    }
}