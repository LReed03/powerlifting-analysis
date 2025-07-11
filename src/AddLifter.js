import React from "react";
import { useState, useEffect } from "react";
import './AddLifter.css';

function AddLifter(props){

    const [name, setName] = useState("");
    const [squat, setSquat] = useState("");
    const [bench, setBench] = useState("");
    const [deadlift, setDeadlift] = useState("");
    const [total, setTotal] = useState("") ;

    useEffect(() => {
        props.setLifterExist(true);
    },[name])

    function checkName(){
        var regex = /^[a-zA-Z\s]*$/;
        if(!regex.test(name)){
            return false;
        }
        return true;
    }

    function checkSquat(){
        let s = parseFloat(squat)
        if(s < 0 ||isNaN(s)){
            return false;
        }
        return true;
    }

    function checkBench(){
        let b = parseFloat(bench)
        if(b < 0 ||isNaN(b)){
            return false;
        }
        return true;
    }

    function checkDeadlift(){
        let dl = parseFloat(deadlift)
        if(dl < 0 ||isNaN(dl)){
            return false;
        }
        return true;
    }

    
    const checkMaxSquat = (squat) => {
        squat = parseFloat(squat)
        if(squat > props.maxSquat){
            props.setMaxSquat(squat)
        }
    }

    const checkMaxBench = (bench) => {
        bench = parseFloat(bench)
        if(bench > props.maxBench){
            props.setMaxBench(bench)
        }
    }

    const checkMaxDeadlift = (deadlift) => {
        deadlift = parseFloat(deadlift)
        if(deadlift > props.maxDeadlift){
            props.setMaxDeadlift(deadlift)
        }
    }

    const checkMaxTotal = (total) => {
        total = parseFloat(total)
        if(total > props.maxTotal){
            props.setMaxTotal(total)
        }
    }

    function handleAdd(){
        if(!checkDeadlift() || !checkBench() || !checkSquat() ||!checkName()){
            props.setMessage("This lifter either doesn't exist, the name was spelt wrong, or they have not competed in a meet yet")
            props.setLifterExist(false);
            return;
        }
        let s = parseFloat(squat);
        let b = parseFloat(bench);
        let dl = parseFloat(deadlift);
        let total = s + b + dl;
        setTotal(total);
        let athlete = {'name': name, 'options':[{'maxlifts': {'squat': squat, 'bench': bench, 'deadlift': deadlift, 'total': total}, 'location': "N/A", 'gender': "N/A"}]}
        for(let i = 0; i < props.athleteList.length; i++){
                if(athlete.name === props.athleteList[i].name){
                    props.setMessage("This lifter is already in the list");
                    props.setLifterExist(false);
                    props.setCreateLifter(false)
                    return;
                }
            }
        checkMaxBench(bench)
        checkMaxSquat(squat)
        checkMaxDeadlift(deadlift)
        checkMaxTotal(total)
        addAthlete(athlete);
        props.setCreateLifter(false)
    }

    const addAthlete = (athlete) => {
        props.setAthleteList(prevList => [...prevList, athlete]);
    }
    
    return(
        <div className="formContainer"> 
            <p>If athlete doesnt already exist enter here:</p>
            <label for="name">Name:</label>
            <input id="name" onChange={(e) => setName(e.target.value)}></input>
            <label for="squat">Squat:</label>
            <input id="squat" onChange={(e) => setSquat(e.target.value)}></input>
            <label for="bench">Bench:</label>
            <input id="bench" onChange={(e) => setBench(e.target.value)}></input>
            <label for="deadlift">Deadlift:</label>
            <input id="deadlift" onChange={(e) => setDeadlift(e.target.value)}></input>
            <button id="addAthlete" onClick={handleAdd}>Add</button>
        </div>
    );
}

export default AddLifter;