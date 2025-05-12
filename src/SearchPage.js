import React, { useState } from "react";
import NameList from "./NameList";

function SearchPage(){
    const [name, setName] = useState("");
    const [athleteList, setAthleteList] = useState([]);
    const [maxSquat, setMaxSquat] = useState(0);
    const [maxBench, setMaxBench] = useState(0);
    const [maxDeadlift, setMaxDeadlift] = useState(0);
    const [lifterDisam, setLifterDisam] = useState(false);
    const [liferDisamList, setLifterDisamList] = useState([])

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
                setLifterDisam(true);
                setLifterDisamList(data)
            }

        }
        catch(error){
            console.error("Error:", error)
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
            {maxSquat}
            <br></br>
            {maxBench}
            <br></br>
            {maxDeadlift}
            <NameList athleteList = {athleteList}/>
        </div>
    )
}

export default SearchPage;