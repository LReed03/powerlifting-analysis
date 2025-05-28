import React from "react";
import './HighestLifts.css'

function HighestLifts(props) {
  return (
    <div className="grid-container">
      <div className="grid-item">Highest Squat</div>
      <div className="grid-item">Highest Bench</div>
      <div className="grid-item">Highest Deadlift</div>
      <div className="grid-item">Highest Total</div>

      <div className="grid-item">{props.maxSquat} Kg</div>
      <div className="grid-item">{props.maxBench} Kg</div>
      <div className="grid-item">{props.maxDeadlift} Kg</div>
      <div className="grid-item">{props.maxTotal} Kg</div>
    </div>
  );
}


export default HighestLifts