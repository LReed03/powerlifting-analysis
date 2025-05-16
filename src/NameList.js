import React from "react";
import './NameList.css';

function NameList(props){

    return(
        <div className="name-list">
            {props.athleteList.map((athlete) => (
            <div className="name-item" key={athlete.name}>
                <p>{athlete.name}</p>
                <p>  Total: {athlete.options[0].maxlifts.total}kg</p>
            </div>
        ))}</div>
    )
}

export default NameList;