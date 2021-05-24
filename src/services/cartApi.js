import axios from 'axios';
import getToken from '../helpers/auth_helper';

export const generateB2WginToken = async (opts) =>{
    const {apiBaseUrl,organizationId,clientId} = opts;
    try{
        const {status,data} = await axios.post(`${apiBaseUrl}/generateToken`,{},{headers : {organizationId,clientId,'Content-Type':'application/json'}});
        localStorage.setItem("b2wGinToken",JSON.stringify(data.token));
        return {status,data};
    }catch(ex){
        return ex.response;
    }
}


export const getB2WginCatalogs = async (opts) =>{
    const {catalogOptions,apiBaseUrl,organizationId,clientId} = opts;
    const {catalogId,categoryId} = catalogOptions;
    const {data} = await generateB2WginToken(opts);
    const token = data.token;

    try{
        let reqData =  {
            retrieveCatalogs    : {
                sessionInfo: {
                    Id: undefined
                },
                catalogId   : catalogId,
                categoryId  : categoryId
            },
            options : catalogOptions
        };
        const resp = await axios.post(`${apiBaseUrl}/RetrieveCatalogs`,
            reqData,
            {headers : {organizationId,clientId,'Content-Type':'application/json',token}});

        return resp;

    }catch(ex){

        if(ex.response.status===401){
            await generateB2WginToken(opts);
            return getB2WginCatalogs(opts)
        }

        return ex.response;
    }

}

export const getB2WginItems = async(opts) =>{
    const {catalogOptions,apiBaseUrl,organizationId,clientId,sessionId} = opts;
    const {catalogId,categoryId,complexProductId} = catalogOptions;
    const token = getToken();

    try{
        let reqData =  {
            retrieveItems  : {
                sessionInfo: {
                    Id: sessionId
                },
                catalogId   : catalogId,
                categoryId  : categoryId,
                complexProductId : complexProductId || ""
            },
            options : catalogOptions
        };
        const resp = await axios.post(`${apiBaseUrl}/RetrieveItems`,
            reqData,
            {headers : {organizationId,clientId,'Content-Type':'application/json',token}});
        return resp;

    }catch(ex){

        if(ex.response.status===401){
            await generateB2WginToken(opts);
            return getB2WginItems(opts)
        }

        return ex.response;
    }

}

export const upsertB2WginItems = async(opts,itemToAdd) =>{
    const {catalogOptions,apiBaseUrl,organizationId,clientId,sessionId} = opts;
    const {complexProductId} = catalogOptions;
    const token = getToken();
    try{
        let reqData =  {
            upsertItems : {
                sessionInfo: {
                    Id : sessionId
                },
                itemsToAdd: [itemToAdd],
                complexProductId : complexProductId || ""
            },
            options : catalogOptions
        };
        const resp = await axios.post(`${apiBaseUrl}/UpsertItems`,
            reqData,
            {headers : {organizationId,clientId,'Content-Type':'application/json',token}});
        return resp;

    }catch(ex){

        if(ex.response.status===401){
            await generateB2WginToken(opts);
            return upsertB2WginItems(opts,itemToAdd)
        }

        return ex.response;
    }
}

export const saveB2WginConfiguration = async(opts) =>{
    const {catalogOptions,apiBaseUrl,organizationId,clientId,sessionId} = opts;
    const token = getToken();

    try{
        let reqData =  {
            saveConfiguration : {
                sessionInfo: {
                    Id : sessionId
                }
            },
            options : catalogOptions
        };
        const resp = await axios.post(`${apiBaseUrl}/SaveConfiguration`,
            reqData,
            {headers : {organizationId,clientId,'Content-Type':'application/json',token}});
        return resp;

    }catch(ex){
        if(ex.response.status===401){
            await generateB2WginToken(opts);
            return saveB2WginConfiguration(opts);
        }
        return ex.response;
    }

}

export const removeB2WginItems  = async(opts,itemToRemove) =>{
    const {catalogOptions,apiBaseUrl,organizationId,clientId,sessionId} = opts;
    const token = getToken();
    try{
        let reqData =  {
            removeItems : {
                sessionInfo: {
                    Id : sessionId
                },
                itemsToRemove: [itemToRemove],
            },
            options : catalogOptions
        };
        const resp = await axios.post(`${apiBaseUrl}/removeItems`,
            reqData,
            {headers : {organizationId,clientId,'Content-Type':'application/json',token}});
        return resp;

    }catch(ex){

        if(ex.response.status===401){
            await generateB2WginToken(opts);
            return removeB2WginItems(opts,itemToRemove)
        }

        return ex.response;
    }
}


export const addB2WginBundle = async(opts,bundleToAdd) =>{
    const {catalogOptions,apiBaseUrl,organizationId,clientId,sessionId} = opts;
    const token = getToken();
    try{
        const reqData = {
            manageBundle: {
                sessionParameters: {},
                sessionInfo: {
                    Id:  sessionId
                },
                bundleToAdd: {
                    fields: {
                        id: bundleToAdd.fields.id
                    }
                }
            }
        };
        const resp = await axios.post(`${apiBaseUrl}/AddBundle`,
            reqData,
            {headers : {organizationId,clientId,'Content-Type':'application/json',token}});
        return resp;

    }catch(ex){
        if(ex.response.status===401){
            await generateB2WginToken(opts);
            return addB2WginBundle(opts,bundleToAdd)
        }
        return ex.response;
    }


}

export const retrieveB2WginItemsFromBundleElement = async (opts,bundleElementId)=>{
    const {catalogOptions,apiBaseUrl,organizationId,clientId,sessionId} = opts;
    // const {catalogId,categoryId,complexProductId} = catalogOptions;

    const token = getToken();
    try{
        const reqData = {
            manageBundle: {
                sessionParameters: {},
                sessionInfo: {
                    Id:  sessionId
                },
                bundleElement: {
                    fields: {
                        id: bundleElementId
                    }
                }
            }
        };
        const resp = await axios.post(`${apiBaseUrl}/RetrieveItemsFromBundleElement`,
            reqData,
            {headers : {organizationId,clientId,'Content-Type':'application/json',token}});
        return resp;

    }catch(ex){
        if(ex.response.status===401){
            await generateB2WginToken(opts);
            return retrieveB2WginItemsFromBundleElement(opts,bundleElementId)
        }
        return ex.response;
    }
}

export const saveB2WginBundleConfiguration = async (opts) =>{
    const {catalogOptions,apiBaseUrl,organizationId,clientId,sessionId} = opts;
    const token = getToken();

    try{
        let reqData =  {
            manageBundle : {
                sessionInfo: {
                    Id : sessionId
                }
            },
            options : catalogOptions
        };
        const resp = await axios.post(`${apiBaseUrl}/SaveBundle`,
            reqData,
            {headers : {organizationId,clientId,'Content-Type':'application/json',token}});
        return resp;

    }catch(ex){
        if(ex.response.status===401){
            await generateB2WginToken(opts);
            return saveB2WginBundleConfiguration(opts);
        }
        return ex.response;
    }
}