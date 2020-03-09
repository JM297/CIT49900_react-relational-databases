import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useSelector} from 'react-redux';
import fire from "../../firebase/Fire";
import Card from "../card/Card";

export default function Collection(){
    const db = fire.firestore();
    const cart = useSelector(state => state.cart);
    const sort = useSelector(state =>state.sort);

    const [collectionItems, setCollectionItems] = useState(cart);

    useEffect(()=>{
        let sortedList = cart;
        for(let i in sort){
            if(sort[i].toggle){
                sortedList=sortedList.filter((item)=>{
                    return sort[i].val.includes(item[i]);
                });
            }
        }
        setCollectionItems(sortedList);
    },[sort, cart]);

    const addToMyStuff =(it) =>{
        const newItem = {name:it.name, image:it.image};
        db.collection("users").doc("B1YaeD5MwkpXevPHw7CC").collection("myCollection").add(newItem).then(()=>{
            console.log("Added");
        });
    };

    let renderItems = collectionItems.map((it, idx) =>
        <div key={idx} className="item" style={{width:300,height:300}}>
            <Link style={{color:it.color, textDecoration:"none"}} to={`collection/item/${it.id}`}><h1>{it.name}</h1></Link>
            <Card imageurl={it.image}/>
            <button onClick={()=>{addToMyStuff(it)}}>Add to Collection</button>
        </div>
    );

    return(
        <div className="collection" style={{display:'flex', justifyContent:'center', flexFlow:'row wrap'}}>
            { collectionItems.length===0 ? "No items in the Collection" : renderItems }
        </div>
    )
}