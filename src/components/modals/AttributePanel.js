import React from 'react'
import {Modal,Button,Accordion,Card} from 'react-bootstrap';
import {connect,useDispatch} from 'react-redux';
import {Wrench} from 'react-bootstrap-icons';
import {DebounceInput} from 'react-debounce-input';

import {filterFamilies} from '../../helpers/b2wgin_data_utils';
import GenericDropDown from '../utils/GenericDropDown';
import {upsertItems} from '../../actions/cartApiActions';
import {showSpinner,hideSpinner} from '../../helpers/general';

const AttributeField = ({item,attribute,env,sessionId}) => {

    const dispatch = useDispatch();


    const onChangeAttribute = async (attributeValue) =>{

        //changing attribute value then call upserItems
        showSpinner();
        let attrId = attribute.fields.id;
        let attrIndex = item.listOfAttributes.findIndex((attr)=>{
            return attrId===attr.fields.id;
        });
        item.listOfAttributes[attrIndex].fields.value=attributeValue;

        let reqOpt = {
            catalogOptions : {...env},
            apiBaseUrl : env.apiBaseURL,
            organizationId : env.organizationId,
            clientId : env.clientId,
            sessionId
        }

        const {status,data} = await dispatch(upsertItems(reqOpt,item));
        hideSpinner();
    }

    const renderContent = () => {
        let disabled = attribute.fields.readonly==="Yes";
        let attrId = attribute.fields.id;
        let attrIndex = item.listOfAttributes.findIndex((attr)=>{
            return attrId===attr.fields.id;
        });
        const currentValue = item.listOfAttributes[attrIndex].fields.value;

        if(attribute.fields.type.toLowerCase() === "enumerated"){
            let options = attribute.listOfDomains.map((dom)=>{
                return {value : dom.fields.value,name : dom.fields.name};
            });
            return (
                <GenericDropDown label={attribute.fields.name} options={options} onchangeFunct={onChangeAttribute} value={currentValue}/>
            );
        }else{
            return (
                <React.Fragment>
                    <div className="input-group mb-3 input-group-sm">
                        <div className="input-group-prepend">
                            <label className="input-group-text" htmlFor={attrIndex}>
                                <span className="px-2">{attribute.fields.name}</span>
                            </label>
                        </div>
                        <DebounceInput 
                        id={attrIndex}
                        debounceTimeout={500}
                        className="form-control change-attribute" 
                        type={attribute.fields.type.toLowerCase()} 
                        value={currentValue}
                        onChange={(e)=>{onChangeAttribute(e.target.value)}}
                        />
                    </div>
                </React.Fragment>

            )
        }



    }


    return (
        <div className="row px-2 py-2">
            <div className="col-xs-12 col-sm-12 col-lg-12">
                {renderContent()}
            </div>
        </div>
    )

}



const AttributePanelContent = ({item,env,sessionId}) =>{

    const renderContent = () =>{
        return (

            <Accordion defaultActiveKey="0">
                {
                    filterFamilies(item).map((fam,index)=>{
                        return (
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey={`${index}`}>
                                    {fam.fields.name}
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey={`${index}`}>
                                    <Card.Body>
                                        {
                                            item.listOfAttributes.filter((attr)=>{
                                                return attr.fields.idfamily===fam.fields.id && attr.fields.hidden === "false";
                                            }).map((attr)=>{
                                                return (<AttributeField item={item} attribute={attr} env={env}  sessionId={sessionId}/>)
                                            })
                                        }
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        )
                    })
                }
            </Accordion>



        )
    }

    return(
        <React.Fragment>
                {renderContent()}
        </React.Fragment>
    )
}

const AttributePanel = ({handleClose,showModal,item,env,sessionId}) =>{
    return(
        <Modal
        show={showModal} 
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered 
        onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <Wrench circle/>
                    <span className="px-2">
                        Configuring {item.fields.productname}
                    </span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AttributePanelContent item={item} env={env}  sessionId={sessionId}/>
            </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

const mapStateToProps = (state) =>{
    return {
        sessionId : state.catalogs.sessionId,
        env : state.environment.data.options,
    }
}

export default connect(mapStateToProps)(AttributePanel);