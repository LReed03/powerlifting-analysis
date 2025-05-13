import React from "react";

function ShowDisam(props){
    return(
        <div>
            <p>{props.athleteList.name}</p>
            {props.athleteList.options.map((athlete) => (
            <div>
                Competition: {athlete.competition} Location: {athlete.location}

                <button type="button" onClick={(e) => props.onSelect(props.athleteList.name.replaceAll(" ","").concat(athlete.index))}>Select</button>
                <br></br>
            </div>
        ))}</div>
    )
}

export default ShowDisam;