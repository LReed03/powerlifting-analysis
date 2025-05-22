import React from "react";
import './AddLifter.css';

function AddLifter(){
    return(
        <div className="formContainer"> 
            <p>If athlete doesnt already exist enter here:</p>
            <label for="name">Name:</label>
            <input id="name"></input>
            <label for="squat">Squat:</label>
            <input id="squat"></input>
            <label for="bench">Bench:</label>
            <input id="bench"></input>
            <label for="total">Total:</label>
            <input id="total"></input>
            <button id="addAthlete">Add</button>
        </div>
    );
}

export default AddLifter;