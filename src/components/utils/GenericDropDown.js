import React,{useState} from 'react';

const GenericDropDown = ({options,onchangeFunct,value,label,disabled,children}) =>{
    const [pickVal,setPickVal] = useState(value);

    options.unshift({"name" : "--Select a Value--","value":null});

    const manageStateChange = (e) =>{

        console.log(e.target.value);

        e.preventDefault();
        setPickVal(e.target.value);
        onchangeFunct(e.target.value);
    }

    return(
        <div className="input-group input-group-sm mb-3">
            <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="inputGroupSelect01">
                    {
                        children ? 
                        <React.Fragment>{children} <span className="px-2">{label}</span></React.Fragment>:
                        label
                    }
                </label>
            </div>
            <select className="custom-select"
            value={pickVal}
            onChange={manageStateChange} id="inputGroupSelect01" disabled={disabled}>
                {
                    options.map(
                        elem => {
                            return <option
                                        key={elem.value}
                                        value={elem.value}
                                    >
                                        {elem.name}
                                    </option>
                        }
                    )
                }
            </select>
        </div>
    );

}

export default GenericDropDown;