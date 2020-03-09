import React, {useEffect, useState} from "react";
import Collection from "./collection/Collection";
import MyCollection from "./collection/MyCollection";
import {Switch, Route,Link} from 'react-router-dom';
import Item from "./item/Item";
import fire from "../firebase/Fire";

export default function UserPage(props){
    const db = fire.firestore();
    const [user,setUser]=useState({});

    useEffect(()=> {
        db.collection("users").doc("B1YaeD5MwkpXevPHw7CC").get().then(function (doc) {
                const object = doc.data();
                let username = {
                    id: doc.id,
                    name: object.name
                };
            setUser(username);
        });
    }, [db]);

    return(
        <div className="userPage">
            <h1>{user.name}'s Page</h1>
            <div className="userNav">
                <Link to={`${props.match.url}/collection`} style={{marginRight: 10}} >Master Collection</Link>
                <Link to={`${props.match.url}/my-collection`}>My Collection</Link>
                <Switch>
                    <Route path={`${props.match.url}/collection/item/:id`} component={Item}/>
                    <Route path={`${props.match.url}/collection`} component={Collection}/>
                    <Route path={`${props.match.url}/my-collection/item/:id`} component={Item} />
                    <Route path={`${props.match.url}/my-collection`} component={MyCollection} />
                </Switch>
            </div>
        </div>
    )
}