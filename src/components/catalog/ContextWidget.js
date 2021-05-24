import React from 'react';
import {connect} from 'react-redux';

const ContextWidget = ({b2wginContext}) =>{
    
    const renderContent = () =>{

        

        const {sessionParameters} = b2wginContext;

        if(!sessionParameters){
            return null;
        }

        let context =
        sessionParameters.currentrootvid && sessionParameters.currentrootvid === sessionParameters.currentvid ?
        'Complex Product' : sessionParameters.currentbundlevid 
        ? 'Bundle' : 'Catalog';

        return(<div className="item-box dark py-2 px-3">
            <span>
                {`Current Context : ${context}`}
            </span>
        </div>)
    }

    return(
        <React.Fragment>
            {renderContent()}
        </React.Fragment>
    )

}

const mapStateToProps = (state) =>{
    return { b2wginContext : state.context}
}

export default connect(mapStateToProps)(ContextWidget);