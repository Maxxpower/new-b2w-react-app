import React,{useState,useEffect} from 'react';
import GenericDropDown from '../utils/GenericDropDown';
import SpinnerPage from '../utils/SpinnerPage'
import {Book} from 'react-bootstrap-icons';

const ChooseCatalog = ({catInfos,onCheckCatalog,disabled}) =>{


    const {catalogs} = catInfos;

    if(!catInfos || !catalogs){
        return (
            <div className="d-flex align-items-center justify-content-center">
                <div className="p-2 bd-highlight col-example">
                    <SpinnerPage/>
                </div>
            </div>
        );
    }

    const catOptions = catalogs.map(e=>{
        return {value : e.catalog.Id,name : e.catalog.Name}
    });


    const manageCatalogSelection = (catalogId) =>{
        onCheckCatalog(catalogId);   
    }

    const renderContent = () =>{
        return(<div className="py-2">
                <GenericDropDown options={catOptions} onchangeFunct={manageCatalogSelection} label="Select Catalog" disabled={disabled}>
                    <Book/>
                </GenericDropDown>
                </div>
            );
    }

    return (
        <React.Fragment>
            {renderContent()}
        </React.Fragment>
    );

}

export default ChooseCatalog;