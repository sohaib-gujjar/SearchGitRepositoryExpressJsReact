import React from "react";

/**
 * 404 page 
 */
export const Page404 = ({ location }) => (
    <div className="p-404-bck">
        <div className="p-404-box">
            <h1>404</h1>
            <p>Page not found</p>
            <h3>No match for <code>{location.pathname}</code></h3>
        </div>
    </div>
);