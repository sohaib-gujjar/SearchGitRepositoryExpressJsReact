import React from "react";

/**
 * Button to remove repository from bookmark
 * @param {*repo, *onAdd} 
 */
export default function RemoveBookmark({repo, onRemove}) {
    return(
        <button onClick={() => onRemove(repo)}>remove</button>
    )
}