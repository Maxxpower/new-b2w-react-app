import React from 'react';
import {Stack,Box,CartPlus} from 'react-bootstrap-icons';

const BundleList = ({contextData,onChooseBundle}) =>{

    const {listOfBundle} = contextData;

    const addBundle = (bundle) =>{
        onChooseBundle(bundle);
    }

    const renderBundleList = () =>{
        return (
            <React.Fragment>

            <div className="row py-2">
                <div className="col-xs-12 col-sm-8 col-lg-8">
                    Bundle Name:
                </div>
                <div className="col-xs-12 col-sm-4 col-lg-4">
                    Add
                </div>
            </div>
                {
                    listOfBundle.map((bundle)=>{
                        return(
                        <div className="row py-3 px-2 item-box">
                            <div className="col-xs-12 col-sm-8 col-lg-8">
                                <span className="cart-item-info">
                                    <Box/><span className="px-2">{bundle.fields.name}</span>                                
                                </span> 
                            </div>
                            <div className="col-xs-12 col-sm-4 col-lg-4">
                                <span className="cart-item-info">
                                    <CartPlus onClick={()=>{addBundle(bundle)}}/>                           
                                </span> 
                            </div>
                            <div className="col-12 py-2">
                                        <span>{bundle.fields.eligibilitycomments}</span>
                            </div>
                        </div>)
                    })
                }
            </React.Fragment>
        );
    }

    const renderContent = () =>{
        return (
            <div className="little-padding item-box white">
                <div className="row">
                    <div className="col-12 py-2">
                        <span><Stack/><span className="px-2">Bundles:</span></span>
                    </div>
                </div>
                {
                    listOfBundle.length===0 ? <div className="col-12 py-2">No Bundle Available</div> :
                    renderBundleList()
                }
            </div>
        )
    }

    return(
        <React.Fragment>
            {renderContent()}
        </React.Fragment>
    )
}

export default BundleList;