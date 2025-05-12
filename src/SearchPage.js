import React, { useState } from "react";

function SearchPage(){
    const [name, setName] = useState("");
    const [athleteList, setAthleteList] = useState([]);
    const [maxSquat, setMaxSquat] = useState(0)
    const [maxBench, setMaxBench] = useState(0)
    const [maxDeadlift, setMaxDeadlift] = useState(0)

    const addAthlete = (athlete) => {
        setAthleteList(prevList => [...prevList, athlete]);
    }


    const checkMaxSquat = (squat) => {
        if(squat > maxSquat){
            setMaxSquat(squat)
        }
    }

    const checkMaxBench = (bench) => {
        if(bench > maxBench){
            setMaxBench(bench)
        }
    }

    const checkMaxDeadlift = (deadlift) => {
        if(deadlift > maxDeadlift){
            setMaxDeadlift(deadlift)
        }
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
            addAthlete(data)
            checkMaxSquat(data.options[0].maxlift.squat)
            checkMaxBench(data.options[0].maxlift.bench)
            checkMaxDeadlift(data.options[0].maxlift.deadlift)
            console.log(data.name)
            console.log(athleteList[0].options[0].maxlifts.bench)
            console.log(athleteList[0].options[0].maxlifts.squat)
            console.log(athleteList[0].options[0].maxlifts.deadlift)
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
            {maxBench}
            {maxDeadlift}
        </div>
    )
}

export default SearchPage;