import React from 'react';
import {Link} from "react-router-dom";

export default function Nav(){
    return(
        <div className="nav">
            <Link style={{marginRight: 10, marginLeft: 10}} to={"/"}>Home</Link>
            <Link style={{marginRight: 10}} to={"/user"}>User</Link>
            <Link style={{marginRight: 10}} to={"/admin"}>Admin</Link>
        </div>
    )
}