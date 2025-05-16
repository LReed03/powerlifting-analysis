import React from "react";
import './ShowDisam.css';

function ShowDisam(props) {
  return (
    <div className="disam-container">
      <p className="disam-header">{props.athleteList.name}</p>
      {props.athleteList.options.map((athlete) => athlete.index > 0 && (
    <div className="disam-option" key={athlete.index}>
        <div>
            <strong>Competition:</strong> {athlete.competition}<br />
            <strong>Location:</strong> {athlete.location}<br />
        </div>
        <button className="disam-button"
        type="button" onClick={() => props.onSelect(props.athleteList.name.replaceAll(" ","").concat(athlete.index))}>Select</button>
    </div>
  )
)}

    </div>
  );
}


export default ShowDisam;