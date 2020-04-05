import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import fire from "../../firebase/Fire";

export default function Item(props){
    const db=fire.firestore();
    const [page,setPage]=useState([]);
    let user = fire.auth().currentUser;

    useEffect(()=> {
        let someStuff = [];
        if(props.match.path==="/collection/item/:id"){
            db.collection("collection").doc(props.match.params.id).get().then(function (doc) {
                const object = doc.data();
                let item = {
                    id: doc.id,
                    name: object.name,
                    image: object.image
                };
                someStuff.push(item);
                setPage(someStuff);
            });
        } else {
            db.collection("users").doc(user.uid).collection("myCollection").doc(props.match.params.id).get().then(function (doc) {
                const object = doc.data();
                let item = {
                    id: doc.id,
                    name: object.name,
                    image: object.image
                };
                someStuff.push(item);
                setPage(someStuff);
            });
        }
    }, [db]);

    let renderPage = page.map((it,idx)=>
        <div key={idx} className="item" style={{width:300,height:300,margin:'auto'}}>
            <h1>{it ? it.name : "Item does not exist"}</h1>
            <img alt="stuff" width="50%" src={it.image}/><br/>
        </div>
    );

    return(
        <>
            {renderPage}
            {props.match.path==="/collection/item/:id"?<Link to={"/collection"}><button>Return</button></Link>:<Link to={"/my-collection"}><button>Return</button></Link>}
        </>
    )
}