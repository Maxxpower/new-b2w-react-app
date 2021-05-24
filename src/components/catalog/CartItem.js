import React,{useState} from 'react';
import {connect,useDispatch} from 'react-redux';
import {Button,Modal,Accordion,Card} from 'react-bootstrap';
import {Wrench,FolderPlus,FolderMinus,CartCheck,Trash,Box} from 'react-bootstrap-icons';

import AttributePanel from '../modals/AttributePanel';
import {filterFamilies} from '../../helpers/b2wgin_data_utils';
import {removeItem,getItems} from '../../actions/cartApiActions';
import {showSpinner,hideSpinner} from '../../helpers/general';


const ConfigureButton = ({item,b2wginContext,env,sessionId}) =>{

    const {sessionParameters} = b2wginContext;
    const dispatch = useDispatch();

    const [showModal,setShowModal] = useState(false);

    const handleShow = async () => {
        showSpinner();
        let complexProductId = sessionParameters.currentrootvid;
        let reqOpt = {
            catalogOptions : {...env,complexProductId},
            apiBaseUrl : env.apiBaseURL,
            organizationId : env.organizationId,
            clientId : env.clientId,
            sessionId
        }
        const {status,data} = await dispatch(getItems(reqOpt));
        hideSpinner();
        setShowModal(true)
    };

    const handleClose = () => {setShowModal(false)};
    const filteredFamilies = filterFamilies(item);

    const renderContent = ()=>{
        if(item.listOfAttributes.length>0 && filteredFamilies.length>0){
            return (
                <React.Fragment>
                    <span class="total-span">
                        <Wrench onClick={handleShow}/>
                    </span>
                    <AttributePanel showModal={showModal} handleClose={handleClose} item={item}/>
                </React.Fragment>

            );
        }
    };

    return(
        <React.Fragment>
            {renderContent()}
        </React.Fragment>
    );

}

const RemoveButton = ({item,b2wginContext,env,sessionId}) =>{

    const dispatch = useDispatch();

    const onRemove = async () => {
        showSpinner();
        let reqOpt = {
            catalogOptions : {...env},
            apiBaseUrl : env.apiBaseURL,
            organizationId : env.organizationId,
            clientId : env.clientId,
            sessionId
        }
        const {status,data} = await dispatch(removeItem(reqOpt,item));
        hideSpinner();
    }

    const renderContent = () =>{
        return (
            <span class="total-span">
                <Trash onClick={onRemove}/>
            </span>
        )
    }

    return (
        <React.Fragment>
            {renderContent()}
        </React.Fragment>
    )
}


const ChildCartItemsList = ({childItems,b2wginContext,env,sessionId}) =>{

    const [accordionOpen,setAccordionOpen] = useState(true);

    const renderIcon = () =>{
        return (
            <React.Fragment>
                {accordionOpen ? <FolderMinus/> : <FolderPlus/>}
            </React.Fragment>
        );
    }

    const switchIcon = () =>{
        setAccordionOpen(!accordionOpen);
    }

    const renderContent = () =>{
        return(
            <Accordion defaultActiveKey="0">
                <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0" onClick={switchIcon}>
                    <span>{renderIcon()}<span className="px-2">Show in Cart Add-ons</span></span>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                            <div className="row">
                                <div className="col-xs-12 col-sm-4 col-lg-4">
                                    Product
                                </div>
                                <div className="col-xs-12 col-sm-4 col-lg-4-half">
                                    Prices (OneTime/Recurring)
                                </div>
                                <div className="col-xs-12 col-sm-2 col-lg-2">
                                    Configure
                                </div>
                                <div className="col-xs-12 col-sm-2 col-lg-2">
                                    Remove
                                </div>
                            </div>
                            {
                                childItems.map(
                                    (childItemAdded) => { 
                                        var miniCartClass = `row mini-cart-row py-3 ${childItemAdded.miniCartClass}`;
                                        return (
                                            <div className={miniCartClass} key={childItemAdded.fields.vid}>
                                                <div className="col-xs-12 col-sm-4 col-lg-4">
                                                    <Box/><span className="px-2">{ childItemAdded.fields.productname }</span>
                                                </div>
                                                <div className="col-xs-12 col-sm-4 col-lg-4">
                                                    <span className="px-2">
                                                        <span className="px-2">
                                                            €&nbsp;
                                                            { `${Number(childItemAdded.fields.onetimefeeov).toFixed(2)}` }
                                                        </span>
                                                        <span className="recurring">
                                                            €&nbsp;
                                                            { `${Number(childItemAdded.fields.recurringchargeov).toFixed(2)}/Monthly` }
                                                        </span>
                                                    </span>
                                                </div>
                                                <div className="col-xs-12 col-sm-2 col-lg-2">
                                                    <ConfigureButton  item={childItemAdded}  b2wginContext={b2wginContext} env={env} sessionId={sessionId}/>                           
                                                </div>
                                                <div className="col-xs-12 col-sm-2 col-lg-2">
                                                    <RemoveButton item={childItemAdded} b2wginContext={b2wginContext} env={env} sessionId={sessionId}/>
                                                </div>
                                                {childItemAdded.childItems.length>0 ?
                                                    <div className="col-xs-12 col-sm-12 col-lg-12">
                                                        <ChildCartItemsList childItems={childItemAdded.childItems} b2wginContext={b2wginContext}/>
                                                    </div>
                                                    : null
                                                }
                                            </div>
                                        )
                                    }
                                )
                            }
                    </Card.Body>
                </Accordion.Collapse>
                </Card>
            </Accordion>
        );
    }

    return (
        <React.Fragment>
            <div className="py-2">
                {renderContent()}
            </div>
        </React.Fragment>
    )

}


const CartItem = ({item,b2wginContext,env,sessionId}) =>{

    //service variables
    const className = item.fields.bundleElement && (item.fields.bundleElement !== '' || item.fields.type !== 'Product') ? 'child-td' : 'parent-td';
    const attributeToShow = item.listOfAttributes.find((i)=>{ return i.fields.showInItem === true});
    const attributeDescription = attributeToShow ? attributeToShow.fields.name : null;
    const attributeValue = attributeToShow ? attributeToShow.fields.value : null;

    //calculating prices
    let baseOneTimeFeeTotal      = Number(item.fields.startingbaseonetimefee);
    let baseRecurringChargeTotal = Number(item.fields.startingbaserecurringcharge);
    for(let child of item.childItems){
        baseOneTimeFeeTotal += Number(child.fields.startingbaseonetimefee) * child.fields.qty;
        if (Number(child.fields.startingbaserecurringcharge) > 0) {
            baseRecurringChargeTotal   += Number(child.fields.startingbaserecurringcharge)  * child.fields.qty;
        }
    }


    const renderContent = () =>{
        return(
            <div className="row cart-item-box" key={ item.fields.vid } id={ item.fields.vid }>
                    <div className={ `${className} col-xs-12 col-sm-4 col-lg-4` }>
                        {/* { this.renderDetailButton(item, context, showButton) }{ item.fields.productname } */}
                        <span><CartCheck/> <span className="px-2">{ item.fields.productname }</span></span>
                        <span className="cartitem-attribute-description">{attributeDescription} <b>&nbsp;{attributeValue}</b></span>
                    </div>
                    <div className="col-xs-12 col-sm-2 col-lg-2">
                        <span className="cart-item-total">
                            €&nbsp;
                            {Number(item.fields.baseonetimefee)>Number(item.fields.onetimefeeov) ? 
                                <span className="barrato">{`${Number(item.fields.baseonetimefee)}`}</span> : null
                            }
                            { `${Number(item.fields.onetimefeeov).toFixed(2)}` }
                        </span>
                        <br/>
                        <span className="cart-item-total">
                            €&nbsp;
                            {Number(item.fields.baserecurringcharge)>Number(item.fields.recurringchargeov) ? 
                                <span className="barrato">{`${Number(item.fields.baserecurringcharge)}`}</span> : null
                            }
                            { `${Number(item.fields.recurringchargeov).toFixed(2)}/${item.fields.recurringchargefrequency}` }
                        </span>
                    </div>
                    <div className="col-xs-12 col-sm-2 col-lg-2">
                        <span className="cart-item-total">
                            €&nbsp;
                            {Number(baseOneTimeFeeTotal)>Number(item.fields.totalonetimefeeov) ? 
                                <span className="barrato">{`${Number(baseOneTimeFeeTotal)}`}</span> : null
                            }
                            { `${Number(item.fields.totalonetimefeeov).toFixed(2)}` }
                        </span>
                        <br/>
                        <span className="cart-item-total">
                            €&nbsp;
                            {Number(baseRecurringChargeTotal)>Number(item.fields.totalrecurringchargeov) ? 
                                <span className="barrato">{`${Number(baseRecurringChargeTotal)}`}</span> : null
                            }
                            { `${Number(item.fields.totalrecurringchargeov).toFixed(2)}/${item.fields.recurringchargefrequency}` }
                        </span>
                    </div>
                    <div className="col-xs-12 col-sm-2 col-lg-2">
                        <ConfigureButton item={item} b2wginContext={b2wginContext} env={env} sessionId={sessionId}/>
                    </div>
                    <div className="col-xs-12 col-sm-2 col-lg-2">
                        <RemoveButton item={item} b2wginContext={b2wginContext} env={env} sessionId={sessionId}/>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-lg-12">
                        {item.childItems.length>0 ?
                            <ChildCartItemsList childItems={item.childItems} b2wginContext={b2wginContext} env={env} sessionId={sessionId}/>
                            :null
                        }
                    </div>
                </div>
        );
    }

    return (
        <React.Fragment>
            <span key={item.vid}>
                {renderContent()}
            </span>
        </React.Fragment>
    )

}

const mapStateToProps = (state) =>{
    return {
        b2wginContext : state.context,
        env : state.environment.data.options,
        sessionId : state.catalogs.sessionId
    };
}
export default connect(mapStateToProps)(CartItem);