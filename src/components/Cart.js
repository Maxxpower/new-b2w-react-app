import React,{useState} from 'react';
import {connect,useDispatch} from 'react-redux';

import {getItems,upsertItems,addBundle,retriveItemsBundleElement} from '../actions/cartApiActions';
import {showSpinner,hideSpinner} from '../helpers/general';


import ContextWidget from './catalog/ContextWidget';
import ChooseCatalog from './catalog/ChooseCatalog';
import ChooseCategory from './catalog/ChooseCategory';
import ItemShowCase from './catalog/ItemsShowCase';
import ConfigurationShowCase from './catalog/ConfigurationShowCase';
import BundleList from './catalog/BundleList';

import history from '../history';

const Cart = ({catInfos,sessionId,fullenv,b2wginContext}) =>{

    //state management
    // const [b2wginContext,setB2wginContext] = useState(null);
    const [catalog,setCatalog] = useState(null);
    const [disableCatalogs,setDisableCatalogs] = useState(false);
    const [currentCategory,setCurrentCategory] = useState(null);


    const dispatch = useDispatch();

    if(!fullenv.data){
        history.push('/');
        return null;
    }

    //action management
    const env = fullenv.data.options;

    //get categories
    const catalogChoosen = async (catalogId) =>{
        if(catalogId){
            showSpinner();
            let reqOpt = {
                catalogOptions : {...env,catalogId},
                apiBaseUrl : env.apiBaseURL,
                organizationId : env.organizationId,
                clientId : env.clientId,
                sessionId
            }
            setCatalog(catalogId);
            const {status,data} = await dispatch(getItems(reqOpt));
            hideSpinner();
        }
    }

    //select categories
    const categoryChoosen = async (categoryId,complexProductId,isBundle) =>{

        if(categoryId){
            showSpinner();
            let reqOpt = {
                catalogOptions : {...env,catalog,categoryId,complexProductId},
                apiBaseUrl : env.apiBaseURL,
                organizationId : env.organizationId,
                clientId : env.clientId,
                sessionId
            }
            setCurrentCategory(categoryId);
            setDisableCatalogs(true);
            if(!isBundle){
                const {status,data} = await dispatch(getItems(reqOpt));
            }else{
                const {status,data} = await dispatch(retriveItemsBundleElement(reqOpt,complexProductId));
            }
            hideSpinner();
        }
    }

    //select showcase Item
    const itemChoosen = async (item,complexProductId) =>{
        showSpinner();
        let reqOpt = {
            catalogOptions : {...env,catalog,categoryId : currentCategory,complexProductId},
            apiBaseUrl : env.apiBaseURL,
            organizationId : env.organizationId,
            clientId : env.clientId,
            sessionId
        }
        const {status,data} = await dispatch(upsertItems(reqOpt,item));
        hideSpinner();
    }

    //select bundle from bundle showcase
    const bundleChoosen = async (bundle) =>{
        showSpinner();
        let reqOpt = {
            catalogOptions : {...env,catalog,categoryId : currentCategory},
            apiBaseUrl : env.apiBaseURL,
            organizationId : env.organizationId,
            clientId : env.clientId,
            sessionId
        }
        const {status,data} = await dispatch(addBundle(reqOpt,bundle));
        hideSpinner();

    }



    const renderBlocks = () =>{

        if(!b2wginContext){
            return null;
        }

        return(
            <React.Fragment>
            <div className="row">
                {/* CATEGORY PICKLIST */}
                <div className="col-5">
                    {b2wginContext && b2wginContext.listOfCategories && b2wginContext.listOfCategories.length>0 ?
                        <ChooseCategory contextData={b2wginContext} onChooseCategory={categoryChoosen}/>
                        : null
                    }
                </div>
            </div>
            <div className="row">
                {/* ITEM SHOW CASE */}
                <div className="col-5">
                    {b2wginContext && b2wginContext.listOfItems ?
                        <ItemShowCase contextData={b2wginContext} filterCategory={currentCategory} onChooseItem={itemChoosen}/>
                        :null
                    }
                </div>
                {/* CONFIGURATION SHOW CASE */}
                <div className="col-7">
                    {b2wginContext && b2wginContext.cart && b2wginContext.cart.length>0 ?
                        <ConfigurationShowCase contextData={b2wginContext}/>
                        :null
                    }
                </div>
            </div>
            {/* BUNDLE LIST */}
            <div className="row">
                <div className="col-5">
                    {b2wginContext && b2wginContext.listOfBundle ?
                        <BundleList contextData={b2wginContext} onChooseBundle={bundleChoosen}/>
                        :null
                    }
                </div>
            </div>
            </React.Fragment>
        );
    }

    
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-9">
                    <ChooseCatalog catInfos={catInfos} onCheckCatalog={catalogChoosen} disabled={disableCatalogs}/>
                </div>
                <div className="col-3 px-2 py-2">
                    <ContextWidget/>
                </div>
            </div>
            {renderBlocks()}
        </div>
    );
};

const mapStateToProps = (state) =>{
    return {
        catInfos : state.catalogs,
        sessionId : state.catalogs.sessionId,
        fullenv : state.environment,
        b2wginContext : state.context
    }
}

export default connect(mapStateToProps)(Cart);