import React from "react";

function SearchPage(){
    async function handleAdd(event){
        event.preventDefault();
        const backendEndpoint = 'http://127.0.0.1:5000';
        fetch(backendEndpoint)
            .then(response => response.json())
            .then(data => {
            // Logic here
             })
             .catch(error => console.error('GET error:', error));
    }

    

    return(
        <div></div>
    )
}

export default SearchPage;