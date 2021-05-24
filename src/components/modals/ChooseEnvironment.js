import React,{useState,useEffect} from 'react';
import {useDispatch,connect} from 'react-redux';
import {Button, FormControl, FormGroup, Modal,Form} from 'react-bootstrap';
import {People} from 'react-bootstrap-icons';

import {showSpinner,hideSpinner} from '../../helpers/general';
import history from '../../history';
import EnvForm from '../utils/EnvForm';
import catalogs from '../../config/catalogs';
import {getCatalogs} from '../../actions/cartApiActions';
import {saveEnvData} from '../../actions/environmentActions';


const ChooseEnvironment = (props) =>{
    
    const [show,setShow] = useState(true);
    const dispatch = useDispatch();

    const handleSubmit = async (e)=>{
        showSpinner();
        let choosenEnv = e.choosenEnv;

        console.log(choosenEnv);

        let envData = catalogs.filter(e => {
            return e.name===choosenEnv;
        })[0];


        let reqData = {
            catalogOptions : envData.data.options,
            apiBaseUrl : envData.data.options.apiBaseURL,
            organizationId : envData.data.options.organizationId,
            clientId : envData.data.options.clientId
        }

        dispatch(saveEnvData(envData));



        const {status,data} = await dispatch(getCatalogs(reqData));
        hideSpinner();
        if(status===200){
            history.push('/configure');
        }

    }


    return(
    <Modal show={show}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered>
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                <People circle/>
                <span className="px-2">
                    Choose environment or customer
                </span>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <EnvForm submitFunction={handleSubmit} catalogs={catalogs}/>
        </Modal.Body>
    </Modal>
    );


}

export default ChooseEnvironment;