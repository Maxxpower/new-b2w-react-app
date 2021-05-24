import React from 'react';
import CartItem from './CartItem';
import Messages from './Messages';
import {Button} from 'react-bootstrap';
import {Cart,Save,Backspace} from 'react-bootstrap-icons';

import {useDispatch,connect} from 'react-redux';
import {saveConfiguration,saveBundleConfig} from '../../actions/cartApiActions';


const ConfigurationHeader = ({contextData,sessionId,env}) =>{
    // let currentBundle           = context.state.currentBundle;
    // let currentBundleElement    = context.state.currentBundleElement;

    const dispatch = useDispatch();

    const onSaveConfiguration = async () =>{
        
        const {sessionParameters} = contextData;
        const isBundleElementNavigation = sessionParameters.currentbundlevid != ""  && sessionParameters.currentbundlevid;
        const isComplexProductNavigation = sessionParameters.currentrootvid !== "" && sessionParameters.currentrootvid && sessionParameters.currentvid === sessionParameters.currentrootvid;

        let reqOpt = {
            catalogOptions : {...env},
            apiBaseUrl : env.apiBaseURL,
            organizationId : env.organizationId,
            clientId : env.clientId,
            sessionId
        }

        if(isBundleElementNavigation && !isComplexProductNavigation){
            const {status,data} = await dispatch(saveBundleConfig(reqOpt));
        }else{
            const {status,data} = await dispatch(saveConfiguration(reqOpt));
        }

    }


    let totalOneTime        = 0;
    let totalRecurring      = 0;
    let totalOneTimeOv      = 0;
    let totalRecurringOv    = 0;
    const {configuration} = contextData;

    totalOneTime     =   configuration.otftb ? configuration.otftb : 0;
    totalRecurring   =   configuration.rctb ? configuration.rctb : 0;
    totalOneTimeOv   =   configuration.NE__One_Time_Fee_Total__c ? configuration.NE__One_Time_Fee_Total__c : 0;
    totalRecurringOv =   configuration.NE__Recurring_Charge_Total__c ? configuration.NE__Recurring_Charge_Total__c : 0;

    // var clearButton = undefined;
    // if (currentBundle.fields.id && !currentBundleElement.fields.id) {
    //     return <span></span>
    // }
    // if (!currentBundleElement.fields.id) (
        // clearButton = <button type="button" className="btn btn-primary margin-right-2 clear-button" onClick={ () => { context.clearCart() } }>
        //     Clear cart
        // </button>
    // );
    return (
        <div className="row item-box py-2 px-2">
            <div className="col-xs-12 col-sm-2 col-lg-4">
                    <span className="configuration-total-label">Total One-Time</span>
                    <span className="configuration-total">
                        €&nbsp;
                        <span className="barrato">{ Number(totalOneTime) > Number(totalOneTimeOv) ? `${Number(totalOneTime).toFixed(2)}` : ''}</span>
                        { totalOneTime !== totalOneTimeOv ? ' ' : ''}
                        { `${Number(totalOneTimeOv).toFixed(2)}` }
                    </span>
            </div>

            <div className="col-xs-12 col-sm-2 col-lg-4">
                    <span className="configuration-total-label">Total Recurring</span>
                    <span className="configuration-total">
                        €&nbsp;
                        <span className="barrato">{ Number(totalRecurring) > Number(totalRecurringOv) ? `${Number(totalRecurring).toFixed(2)}` : ''}</span>
                        { totalRecurring !== totalRecurringOv ? ' ' : ''}
                        { `${Number(totalRecurringOv).toFixed(2)}` }
                    </span>
            </div>

            <div className="col-xs-12 col-sm-2 col-lg-2">
                <Button><Backspace/><span className="px-1">Clear</span></Button>
            </div>
            <div className="col-xs-12 col-sm-2 col-lg-2">
                <Button onClick={onSaveConfiguration}><Save/><span className="px-1">Save</span></Button>
            </div>

        </div>
    )
}


const ConfigurationShowCase = ({contextData,env,sessionId}) =>{
    const {cart} = contextData;
    const filteredCartItems = cart.filter((ci)=>{
        return !ci.fields.hiddenInCart;
    })

    const renderContent = () =>{


        return(
            <div id="cartContainer" className="little-padding col-xs-12 col-sm-12 col-lg-12-configuration item-box white">
                <div className="row">
                    <div className="col-12 py-2">
                        <span><Cart size={20}/><span className="px-2">Current Configuration</span></span>
                    </div>
                </div>
                <div className="px-2 py-2">
                    <ConfigurationHeader contextData={contextData} sessionId={sessionId} env={env}/>
                </div>
                <div className="px-2 py-2">
                    <div className="row item-box">
                        <div className="col-12 py-2">
                            <Messages contextData={contextData}/>
                        </div>
                    </div>  
                </div>
                <div className="col-xs-12 col-sm-12 col-lg-12">
                    <div className="row">
                        <div className="col-xs-12 col-sm-4 col-lg-4">
                            Name
                        </div>
                        <div className="col-xs-12 col-sm-2 col-lg-2">
                            Price per unit
                        </div>
                        <div className="col-xs-12 col-sm-2 col-lg-2">
                            Total
                        </div>
                        <div className="col-xs-12 col-sm-2 col-lg-2">
                            Configure
                        </div>
                        <div className="col-xs-12 col-sm-2 col-lg-2">
                            Remove
                        </div>
                    </div>
                    {
                        filteredCartItems.map((ci)=>{
                            return <CartItem item={ci}/>;
                        })
                    }
                </div>
            </div>
        );
    }

    return (
        <React.Fragment>
            {renderContent()}
        </React.Fragment>
    );

}

const mapStateToProps = (state) =>{
    return {
        sessionId : state.catalogs.sessionId,
        env : state.environment.data.options
    }
}

export default connect(mapStateToProps)(ConfigurationShowCase);