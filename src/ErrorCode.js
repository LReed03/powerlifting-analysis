import React from "react";
import './ErrorCode.css'

function ErrorCode(props){
    return(
        <div className="error-message">
            {props.message}
        </div>
    )
}

export default ErrorCode;