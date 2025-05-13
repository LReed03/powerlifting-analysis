import React, { useState, useEffect} from "react";
import NameList from "./NameList";
import ShowDisam from "./ShowDisam";
import ErrorCode from "./ErrorCode";

function SearchPage(){
    const [name, setName] = useState("");
    const [athleteList, setAthleteList] = useState([]);
    const [maxSquat, setMaxSquat] = useState(0);
    const [maxBench, setMaxBench] = useState(0);
    const [maxDeadlift, setMaxDeadlift] = useState(0);
    const [lifterDisam, setLifterDisam] = useState(false);
    const [liferDisamList, setLifterDisamList] = useState([])
    const [liferExist, setLifterExist] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        setLifterExist(true);

    },[name])
 
    const addAthlete = (athlete) => {
        setAthleteList(prevList => [...prevList, athlete]);
    }


    const checkMaxSquat = (squat) => {
        squat = parseFloat(squat)
        if(squat > maxSquat){
            setMaxSquat(squat)
        }
    }

    const checkMaxBench = (bench) => {
        bench = parseFloat(bench)
        if(bench > maxBench){
            setMaxBench(bench)
        }
    }

    const checkMaxDeadlift = (deadlift) => {
        deadlift = parseFloat(deadlift)
        if(deadlift > maxDeadlift){
            setMaxDeadlift(deadlift)
        }
    }

    function handleLiferDisam(event){
        event.preventDefault();
        
    }


    async function handleAdd(event){
        event.preventDefault();
        const backendEndpoint = `http://127.0.0.1:5000/${name}`;
        try{
            const response = await fetch(backendEndpoint, {
                method: "GET",
                headers:{
                    'Content-Type': 'application/json',
                },
  
            });

            if(!response.ok){
                setMessage("This lifter either doesn't exist, the name was spelt wrong, or they have not competed in a meet yet")
                setLifterExist(false)
            }

            const data = await response.json();
            console.log(data)
            if(data.options.length == 1){
                addAthlete(data)
                checkMaxSquat(data.options[0].maxlifts.squat)
                checkMaxBench(data.options[0].maxlifts.bench)
                checkMaxDeadlift(data.options[0].maxlifts.deadlift)
                console.log(data.name)
            }
            if(data.options.length > 1){
                setLifterDisamList(data)
                setLifterDisam(true);
            }

        }
        catch(error){
            console.error("Error:", error)
        }
    }

    async function handleSelect(selectedName) {
        const backendEndpoint = `http://127.0.0.1:5000/${selectedName}`;
        try {
            const response = await fetch(backendEndpoint, {
                method: "GET",
                headers: { 'Content-Type': 'application/json' },
            });
            if(!response.ok){
                setMessage("There was an error selecting this lifter");
                setLifterExist(false);
                setLifterDisam(false);
            }
            const data = await response.json();
            addAthlete(data);
            checkMaxSquat(data.options[0].maxlifts.squat);
            checkMaxBench(data.options[0].maxlifts.bench);
            checkMaxDeadlift(data.options[0].maxlifts.deadlift);
            setLifterDisam(false);
        } catch (error) {
            console.error("Error:", error);
        }
    }


    function handleSubmit(event){
        event.preventDefault();
    }

    

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label for="athletSearch">Enter Athletes Name: </label>
                <input id="athleteSearch" onChange={(e) => setName(e.target.value.replaceAll(" ",""))}></input>
                <button id="addAthlete" onClick={handleAdd}>Add</button>
                <br/>
                <button id="submit" type="submit">Submit</button>
            </form>
            {liferExist ?  <div></div>: <ErrorCode message={message}/>}
            {maxSquat}
            <br/>
            {maxBench}
            <br/>
            {maxDeadlift}
            {lifterDisam ? <ShowDisam athleteList={liferDisamList} onSelect={handleSelect}/> : <div></div>}
            <NameList athleteList = {athleteList}/>
        </div>
    )
}

export default SearchPage;