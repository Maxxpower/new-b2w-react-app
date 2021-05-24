import React,{useEffect,useState} from 'react';
import {useDispatch,connect} from 'react-redux';
import {retriveItemsBundleElement} from '../../actions/cartApiActions';
import _ from 'lodash';
import {CartPlus,XCircle,Folder2,Box,Archive} from 'react-bootstrap-icons';
import {Tabs,Tab} from 'react-bootstrap';
import {showSpinner,hideSpinner} from '../../helpers/general';


const ItemShowCase = ({contextData,filterCategory,onChooseItem,env,sessionId}) =>{

    const {listOfItems,sessionParameters,listOfCategories} = contextData;

    //checking context, if we are in complex product navigation for example
    //getting category informations
    const isComplexProductNavigation = sessionParameters.currentrootvid !== "" && sessionParameters.currentrootvid && sessionParameters.currentvid === sessionParameters.currentrootvid;
    const isBundleElementNavigation = sessionParameters.currentbundlevid != ""  && sessionParameters.currentbundlevid;

    const dispatch = useDispatch();

    useEffect(()=>{

        const fetchBundleElems = async () =>{
            if(isBundleElementNavigation){

                const firstBEId = contextData.listOfBundle
                .filter((bundle)=>{return bundle.fields.id===sessionParameters.currentbundleid})[0].bundleElements[0].fields.id
                let reqOpts = {
                    catalogOptions : {...env},
                    apiBaseUrl : env.apiBaseURL,
                    organizationId : env.organizationId,
                    clientId : env.clientId,
                    sessionId
                }
                await dispatch(retriveItemsBundleElement(reqOpts,firstBEId));
            } 
        }
        fetchBundleElems();

    },[sessionParameters.currentbundlevid])


    const changeBundleElement = async (key)=>{
        showSpinner();
        let reqOpts = {
            catalogOptions : {...env},
            apiBaseUrl : env.apiBaseURL,
            organizationId : env.organizationId,
            clientId : env.clientId,
            sessionId
        }
        const {status,data} = await dispatch(retriveItemsBundleElement(reqOpts,key));
        hideSpinner();

    }
    
    const filteredCategory = listOfCategories.filter((cat)=>{
        return cat.categoryFields.id===filterCategory;
    })[0];
    
    const categoryName = 
    filteredCategory ? 
    isComplexProductNavigation ? filteredCategory.categoryFields.categoryname  : filteredCategory.categoryFields.name
    : null;
    
    const categoryMaxQty = filteredCategory ? filteredCategory.categoryFields.maxqty || 999 : null;
    const categoryMinQty = filteredCategory ? filteredCategory.categoryFields.minqty || 0 : null;


    let filteredShowCaseItems = listOfItems.filter((elem)=>{
        return elem.fields.categoryname === categoryName 
        && elem.fields.visible==="true" 
        && (elem.fields.type==="Product" || (isComplexProductNavigation && elem.fields.type==="Child-Product"));
    });

    filteredShowCaseItems = _.isEmpty(filteredShowCaseItems) ? 
    listOfItems.filter((elem)=>{
        let firstCat = listOfCategories[0];
        let firstCatName = isComplexProductNavigation ? firstCat.categoryFields.categoryname  : firstCat.categoryFields.name;
        
        if(isBundleElementNavigation){
            return elem.fields.bundleElement === sessionParameters.currentbundleelementid;
        }else{
            return elem.fields.categoryname === firstCatName;
        }

    })
    : filteredShowCaseItems;

    const addToCart = (item) =>{
        if(isComplexProductNavigation){
            onChooseItem(item,sessionParameters.currentrootvid)
        }else{
            onChooseItem(item,null);
        }
    }

    const renderShowCaseItems = () =>{

        let flatCart = contextData.cart;
        contextData.cart.forEach(element => {
            flatCart = flatCart.concat(element.childItems);
        });


        return(
            <div className="little-padding item-box white">
                <div className="row">
                    <div className="col-12 py-2">
                        <span><Folder2 size={20}/> <span className="px-2">{isComplexProductNavigation ? "Configure Add ons" : "Items in Category :"}</span></span>
                    </div>
                    <div className="col-12 py-2 item-box" >
                        <span className="px-2">Min Quantity : {categoryMinQty}</span>
                        <span className="px-2">Max Quantity : {categoryMaxQty}</span>
                    </div>
                </div>
                <div className="row px-2">

                    <div className="col-xs-12 col-sm-4 col-lg-4 cart-item-label">
                        Name
                    </div>
                    <div className="col-xs-12 col-sm-3 col-lg-3 cart-item-label">
                        One-Time
                    </div>
                    <div className="col-xs-12 col-sm-4 col-lg-4 cart-item-label">
                        Recurring
                    </div>
                    <div className="col-xs-12 col-sm-1 col-lg-1 cart-item-label">
                        Add
                    </div>
                </div>
                {
                    
                    filteredShowCaseItems.map(
                        item => {
                            let itemCartQty = flatCart.filter(i => { return i.fields.id === item.fields.id }).length;
                            let addDisabled = (item.fields.maxqty <= itemCartQty) || item.fields.eligible === 'N';

                            return  (<div className="row item-box py-3 px-2" key={item.fields.id}>

                                        <div className="col-xs-12 col-sm-4 col-lg-4" >
                                            <span className="cart-item-info">
                                                <Box/><span className="px-2">{item.fields.productname}</span>
                                            </span>
                                        </div>
                                        <div className="col-xs-12 col-sm-3 col-lg-3">
                                            <span>{ `€ ${Number(item.fields.onetimefeeov).toFixed(2)}` }</span>
                                        </div>
                                        <div className="col-xs-12 col-sm-4 col-lg-4">
                                            <span>{ `€ ${Number(item.fields.recurringchargeov).toFixed(2)}/${item.fields.recurringchargefrequency}` }</span>
                                        </div>
                                        <div className="col-xs-12 col-sm-1 col-lg-1">
                                                    {!addDisabled ? 
                                                        <span><CartPlus onClick={() => {addToCart(item)}}/></span> :
                                                        <span><XCircle/></span>
                                                    }
                                        </div>
                                        <div className="col-12 py-2">
                                            <span>{item.fields.eligibilitycomments}</span>
                                        </div>
                                    </div>);
                        }
                    )
                }
            </div>

        )

    }

    const renderShowCase = () =>{

        //check on bundleelements showing
        if(isBundleElementNavigation && !isComplexProductNavigation){

            const listOfBundleElementsLabel = contextData.listOfBundle
            .filter((bundle)=>{return bundle.fields.id===sessionParameters.currentbundleid})[0].bundleElements
            .map((bundleElem)=>{return {name:bundleElem.fields.name,id:bundleElem.fields.id}});

            return(
                <div className="item-box white">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-lg-12 py-3">
                            <span className="pl-2"><Archive/><span className="px-2" style={{color : "#a845cd", fontWeight : "bold"}}>Bundle Elements</span></span>
                        </div>
                        <div className="col-12">
                            <Tabs onSelect={(k)=>{changeBundleElement(k)}}>
                                {listOfBundleElementsLabel.map((elem)=>{
                                    return(
                                        <Tab eventKey={elem.id} title={elem.name}>
                                            {renderShowCaseItems()}
                                        </Tab>
                                    )
                                })}
                            </Tabs>
                        </div>
                    </div>
                </div>
            )

        }else{
            return renderShowCaseItems();
        }
    }

    return (<React.Fragment>
        {renderShowCase()}
    </React.Fragment>)


}

const mapStateToProps = (state) =>{
    return {
        env : state.environment.data.options,
        sessionId : state.catalogs.sessionId
    };
}
export default connect(mapStateToProps)(ItemShowCase);