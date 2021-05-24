export const filterFamilies = (item) =>{
    const filteredFamilies = [];
    item.listOfFamilies.forEach((fam)=>{
        let famAttrs = item.listOfAttributes.filter((attr)=>{
            return attr.fields.idfamily === fam.fields.id && attr.fields.hidden === "false"
        });
        if(famAttrs.length>0 && fam.fields.hidden!=="true"){
            filteredFamilies.push(fam);
        }
    });
    return filteredFamilies;
}