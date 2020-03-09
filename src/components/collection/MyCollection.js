import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import {checkChange} from "../../redux/actions/setActions";
import fire from "../../firebase/Fire";
import Card from "../card/Card";

export default function MyCollection() {
    const db=fire.firestore();
    const dispatch = useDispatch();
    const change = useSelector(state => state.change);

    const [myItems,setMyItems]=useState([]);

    useEffect(()=> {
        let someStuff = [];
        db.collection("users").doc("B1YaeD5MwkpXevPHw7CC").collection("myCollection").get().then(function (snapshot) {
            snapshot.forEach(function (doc) {
                const object = doc.data();
                let item = {
                    id: doc.id,
                    name: object.name,
                    image: object.image
                };
                someStuff.push(item);
            });
            setMyItems(someStuff);
        });
    }, [db,dispatch,change]);

    const deleteItem = (id) => {
        db.collection("users").doc("B1YaeD5MwkpXevPHw7CC").collection("myCollection").doc(id).delete().then(()=>{
            dispatch(checkChange());
            console.log("Deleted");
        })
    };

    let renderMyItems = myItems.map((it,idx)=>
        <div key={idx} className="item" style={{width:300,height:300}}>
            <Link style={{textDecoration:"none"}} to={`my-collection/item/${it.id}`}><h1>{it.name}</h1></Link>
            <Card imageurl={it.image}/>
            <button onClick={()=>{deleteItem(it.id)}}>Delete Item</button>
        </div>
    );

    return(
        <div className="myCollection" style={{display:'flex', justifyContent:'center', flexFlow:'row wrap'}}>
            { myItems.length===0 ? "No items in the Collection" : renderMyItems }
        </div>
    )
}