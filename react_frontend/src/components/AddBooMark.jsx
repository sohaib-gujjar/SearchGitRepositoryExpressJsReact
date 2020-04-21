
import React from "react";

/**
 * Button to add repository to bookmark
 * @param {*repo, *onAdd} 
 */
export default function AddBooMark({repo, onAdd}) {
    return(
        <button onClick={() => onAdd(repo)}>add</button>
    )
}  