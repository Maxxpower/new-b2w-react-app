import {RETRIEVE_ITEMS,UPDATE_CONTEXT,RETRIEVE_CATALOGS} from './types';
import {
    getB2WginCatalogs,
    getB2WginItems,
    upsertB2WginItems,
    saveB2WginConfiguration,
    removeB2WginItems,
    addB2WginBundle,
    retrieveB2WginItemsFromBundleElement,
    saveB2WginBundleConfiguration
} from '../services/cartApi';

export const getCatalogs = (opts) => async dispatch =>{
    const {status,data} = await getB2WginCatalogs(opts);
    dispatch({
        payload : data,
        type : RETRIEVE_CATALOGS
    });
    return {status,data};
}

export const getItems = (opts) => async dispatch =>{
    const {status,data} = await getB2WginItems(opts);
    dispatch({
        payload : data,
        type : UPDATE_CONTEXT
    });
    return {status,data};
}

export const upsertItems = (opts,itemToAdd) => async dispatch => {
    const {status,data} = await upsertB2WginItems(opts,itemToAdd);
    dispatch({
        payload : data,
        type : UPDATE_CONTEXT
    });
    return {status,data};
}

export const saveConfiguration = (opts) => async dispatch =>{
    const {status,data} = await saveB2WginConfiguration(opts);
    dispatch({
        payload : data,
        type : UPDATE_CONTEXT
    });
    return {status,data};
}

export const removeItem = (opts,itemToRemove) => async dispatch =>{
    const {status,data} = await removeB2WginItems(opts,itemToRemove);
    dispatch({
        payload : data,
        type : UPDATE_CONTEXT
    });
    return {status,data};
}

export const addBundle = (opts,bundleToAdd) => async dispatch =>{
    const {status,data} = await addB2WginBundle(opts,bundleToAdd);
    dispatch({
        payload : data,
        type : UPDATE_CONTEXT
    });
    return {status,data};
}

export const retriveItemsBundleElement = (opts,bundleElementId) => async dispatch => {
    const {status,data} = await retrieveB2WginItemsFromBundleElement(opts,bundleElementId);
    dispatch({
        payload : data,
        type : UPDATE_CONTEXT
    });
    return {status,data};
}

export const saveBundleConfig = (opts) => async dispatch => {
    const {status,data} = await saveB2WginBundleConfiguration(opts);
    dispatch({
        payload : data,
        type : UPDATE_CONTEXT
    });
    return {status,data};
}

