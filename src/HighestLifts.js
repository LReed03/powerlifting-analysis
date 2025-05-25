import React from "react";
import './HighestLifts.css'

function HighestLifts(props) {
  return (
    <div className="grid-container">
      <div className="grid-item">Highest Squat</div>
      <div className="grid-item">Highest Bench</div>
      <div className="grid-item">Highest Deadlift</div>
      <div className="grid-item">Highest Total</div>

      <div className="grid-item">{props.maxSquat}</div>
      <div className="grid-item">{props.maxBench}</div>
      <div className="grid-item">{props.maxDeadlift}</div>
      <div className="grid-item">{props.maxTotal}</div>
    </div>
  );
}


export default HighestLifts