import React from "react";

function NameList(props){

    return(
        <div>{props.athleteList.map((athlete) => (
            <div>
                <p>{athlete.name}</p>
                <br></br>
            </div>
        ))}</div>
    )
}

export default NameList;