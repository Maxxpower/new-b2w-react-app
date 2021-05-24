import React from 'react';
import GenericDropDown from '../utils/GenericDropDown';
import {Bookmark} from 'react-bootstrap-icons';

const ChooseCategory = ({contextData,onChooseCategory}) =>{


    const {listOfCategories,sessionParameters} = contextData;
    const isComplexProductNavigation = sessionParameters.currentrootvid !== "" 
    && sessionParameters.currentrootvid 
    && sessionParameters.currentvid === sessionParameters.currentrootvid;
    
    // const isBundleNavigation = sessionParameters.currentbundlevid !== "" && sessionParameters.currentbundlevid;
    const label = isComplexProductNavigation ? "Choose Complex Offer Subcategory" :"Choose Category";

    const sendChangeCategory = (categoryId) =>{
        if(isComplexProductNavigation){
            onChooseCategory(categoryId,sessionParameters.currentrootvid,false);
        }else{
            onChooseCategory(categoryId,null);
        }
    }

    let mappedCategories = listOfCategories.map((cat)=>{
        return {
            name : cat.categoryFields.name ==="" ? cat.categoryFields.categoryname : cat.categoryFields.name,
            value : cat.categoryFields.id
        };
    });


    return (
        <div className="py-2">
            <GenericDropDown options={mappedCategories} onchangeFunct={sendChangeCategory} label={label}>
                <Bookmark/>
            </GenericDropDown>
        </div>
    )

}

export default ChooseCategory;