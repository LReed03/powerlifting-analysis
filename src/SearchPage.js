import React, { useState, useEffect} from "react";
import NameList from "./NameList";
import ShowDisam from "./ShowDisam";
import ErrorCode from "./ErrorCode";
import AddLifter from "./AddLifter";
import HighestLifts from "./HighestLifts";
import './SearchPage.css'

function SearchPage(){
    const [name, setName] = useState("");
    const [athleteList, setAthleteList] = useState([]);
    const [maxSquat, setMaxSquat] = useState(0);
    const [maxBench, setMaxBench] = useState(0);
    const [maxDeadlift, setMaxDeadlift] = useState(0);
    const [maxTotal, setMaxTotal] = useState(0);
    const [lifterDisam, setLifterDisam] = useState(false);
    const [liferDisamList, setLifterDisamList] = useState([])
    const [liferExist, setLifterExist] = useState(true);
    const [message, setMessage] = useState("");
    const [createLifter, setCreateLifter] = useState(false);

    useEffect(() => {
        setLifterExist(true);
        setCreateLifter(false);
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

    const checkMaxTotal = (total) => {
        total = parseFloat(total)
        if(total > maxTotal){
            setMaxTotal(total)
        }
    }

    const sortByTotal = () => {
        const sorted = [...athleteList].sort((a,b) => b.options[0].maxlifts.total - a.options[0].maxlifts.total)
        setAthleteList(sorted)
    }

    const clear = () => {
        setMaxBench(0)
        setMaxSquat(0)
        setMaxDeadlift(0)
        setMaxTotal(0)
        setAthleteList([])
    }



    async function handleAdd(){
        setLifterExist(true);
        if(name == ""){
            setMessage("Lifter name cannot be blank");
            setLifterExist(false);
            return;
        }
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
                for(let i = 0; i < athleteList.length; i++){
                    if(data.name === athleteList[i].name){
                        setMessage("This lifter is already in the list");
                        setLifterExist(false);
                        return;
                    }
                }
                addAthlete(data)
                checkMaxSquat(data.options[0].maxlifts.squat)
                checkMaxBench(data.options[0].maxlifts.bench)
                checkMaxDeadlift(data.options[0].maxlifts.deadlift)
                checkMaxTotal(data.options[0].maxlifts.total)
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
            for(let i = 0; i < athleteList.length; i++){
                if(data.name === athleteList[i].name){
                    setMessage("This lifter is already in the list");
                    setLifterExist(false);
                    setLifterDisam(false);
                    return;
                }
            }
            addAthlete(data);
            checkMaxSquat(data.options[0].maxlifts.squat);
            checkMaxBench(data.options[0].maxlifts.bench);
            checkMaxDeadlift(data.options[0].maxlifts.deadlift);
            checkMaxTotal(data.options[0].maxlifts.total)
            setLifterDisam(false);
        } 
        catch (error) {
            console.error("Error:", error);
        }
    }


    function handleSort(){
        sortByTotal()
    }

    function toggleCreateLifter(){
        setCreateLifter(!createLifter)
    }

    

    return(
        <div>
            <HighestLifts maxSquat = {maxSquat} maxBench = {maxBench} maxDeadlift = {maxDeadlift} maxTotal = {maxTotal}/>
            <div className="formContainer">
                <label for="athleteSearch">Enter Athletes Name: </label>
                <input id="athleteSearch" onChange={(e) => setName(e.target.value.replaceAll(" ",""))}></input>
                <button id="addAthlete" onClick={handleAdd}>Add</button>
                <br/>
                <button id="sort" onClick={handleSort}>Sort</button>
                <br/>
                <button id="clear" onClick={clear}>Clear</button>
                <br/>
                <button id="create-lifter" onClick={toggleCreateLifter}>Create Lifter</button>
            </div>
            {createLifter ? <AddLifter athleteList = {athleteList} setAthleteList={setAthleteList} setLifterExist = {setLifterExist} setMessage={setMessage} setCreateLifter={setCreateLifter}
            maxSquat = {maxSquat} setMaxSquat = {setMaxSquat} maxBench = {maxBench} setMaxBench = {setMaxBench} maxDeadlift = {maxDeadlift} setMaxDeadlift = {setMaxDeadlift}
            maxTotal = {maxTotal} setMaxTotal = {setMaxTotal}/> : <div></div>}
            {liferExist ?  <div></div>: <ErrorCode message={message}/>}
            {lifterDisam ? <ShowDisam athleteList={liferDisamList} onSelect={handleSelect}/> : <div></div>}
            {athleteList.length > 0 && (
            <NameList athleteList={athleteList} />)}
        </div>
    )
}

export default SearchPage;