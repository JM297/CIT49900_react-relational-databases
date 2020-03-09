import React, {useEffect, useState} from 'react';
import fire from "../../firebase/Fire";
import {useDispatch, useSelector} from "react-redux";
import {checkChange} from "../../redux/actions/setActions";
import Card from "../card/Card";

export default function Admin(){
    const db = fire.firestore();
    const dispatch = useDispatch();
    const [value,setValues] = useState({
        name: "",
        image: ""
    });
    const cart = useSelector(state => state.cart);
    const sort = useSelector(state => state.sort);
    const [collectionItems,setCollectionItems] = useState(cart);

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

    const handleChange = prop => event => {
            setValues({...value, [prop]: event.target.value});
    };
    const submit = () => {
        console.log(value);
            db.collection("collection").add(value).then(()=>{
                setValues({
                    name: "",
                    image: ""
                });
                dispatch(checkChange());
            });
    };
    const deleteItem = (id) => {
        db.collection("collection").doc(id).delete().then(()=>{
            dispatch(checkChange());
            console.log("Deleted");
        })
    };

    let masterList = collectionItems.map((it, idx) =>
        <div key={idx} style={{width:150,height:150}} className="item">
            <h4>{it.name}</h4>
            <Card imageurl={it.image}/>
            <button onClick={()=>{deleteItem(it.id)}}>Delete Item</button>
        </div>
    );

    return(
        <div className="admin">
            <h1>Admin's Screen</h1>
            <div className="form">
                <input type="text" onChange={handleChange("name")} placeholder="Name" value={value.name}/>
                <input type="text" onChange={handleChange("image")} placeholder="Image" value={value.image}/>
                <button onClick={submit}>Submit</button>
            </div><br/>
            <h3>Master Collection</h3>
            <div className="masterList" style={{display:'flex',flexFlow:'row wrap',justifyContent:'center'}}>
                {masterList}
            </div>
        </div>
    )
}