import React from "react";
import {useSelector} from "react-redux";
import {Link, Route, Switch} from "react-router-dom";
import Item from "../item/Item";
import Collection from "../collection/Collection";
import MyCollection from "../collection/MyCollection";

export default function UserPage(props){
    const realUser=useSelector(state=>state.realUser);

    return(
        <div className="userPage">
            <h1>{realUser.name}'s Page</h1>
            <div className="userNav">
                <Link to={`${props.match.url}/collection`} style={{marginRight: 10}} >Master Collection</Link>
                <Link to={`${props.match.url}/my-collection`}>My Collection</Link>
                <Switch>
                    <Route path={`${props.match.url}/collection/item/:id`} component={Item}/>
                    <Route path ={`${props.match.url}/collection`} component={Collection}/>
                    <Route path={`${props.match.url}/my-collection/item/:id`} component={Item}/>
                    <Route path ={`${props.match.url}/my-collection`} component={MyCollection}/>
                </Switch>
            </div>
        </div>
    )
}