import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner, faExclamationCircle} from "@fortawesome/free-solid-svg-icons";

export default function Card(props) {
    const [load, setLoad] = useState("loading");
    const [rend, setRend] = useState({
        img: false,
        spin: true,
        error: false
    }) ;
    const [seconds, setTime] = useState(0);

    useEffect(()=>{

        let interval = null;

        interval = setInterval(()=>{
            if(load){
                setTime(seconds+1);
                if(props.imageurl===null){
                    setRend({
                        img:false,
                        spin:false,
                        error:true
                    });
                } else {
                    setRend({
                        img:true,
                        spin:false,
                        error:false
                    })
                }
            } else {
                if(seconds>3){
                    setRend({
                        img:false,
                        spin:false,
                        error:true
                    });
                } else {
                    setRend({
                        img:false,
                        spin:true,
                        error:false
                    });
                }
            }
        },1000);

        return ()=>clearInterval(interval);

    },[props.imageurl,rend,seconds,load]);

    return(
        <div className="card">
            {rend.img&&<img onLoad={()=>setLoad(true)} onError={()=>setLoad(false)} style={{width:"50%"}} alt="thing goes here" src={props.imageurl}/>}
            {rend.spin&&<FontAwesomeIcon icon={faSpinner}/>}
            {rend.error&&<FontAwesomeIcon icon={faExclamationCircle}/>}
        </div>
    )
}