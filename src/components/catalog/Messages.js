import React from 'react';
import { Mailbox2 } from 'react-bootstrap-icons';


const Messages = ({contextData}) =>{

    const {messages} = contextData;

    const renderContent = ()=>{
        return messages.map((elem)=>{
            let textColor = elem.type==="war" ? "warning" : "black";
            return(<li>{elem.text} {elem.shorttext}</li>)
        })
    } 

    return (
        <React.Fragment>
            <span className="py-2"><Mailbox2 size={20}/><span className="px-2">Messages</span></span>
            <ul>{renderContent()}</ul>
        </React.Fragment>
    );

}

export default Messages;