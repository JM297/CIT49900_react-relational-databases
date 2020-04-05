import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import './App.css';
import Nav from "./components/nav/Nav";
import Admin from "./components/admin/Admin";
import fire from "./firebase/Fire";
import {useDispatch, useSelector} from "react-redux";
import {checkSignIn, currentUser, initCollection} from "./redux/actions/setActions";
import UserPage from "./components/userPage/UserPage";
import SignIn from "./components/signing/SignIn";
import SignUpPage from "./components/signing/SignUp";

export default function App() {
    const change = useSelector(state => state.change);
    const signedIn = useSelector(state => state.signedIn);
    const dispatch = useDispatch();
    const db = fire.firestore();

    useEffect(()=> {
        let someStuff = [];
        db.collection("collection").get().then(function (snapshot) {
            snapshot.forEach(function (doc) {
                const object = doc.data();
                let item = {
                    id: doc.id,
                    name: object.name,
                    image: object.image
                };
                someStuff.push(item);
            });
            dispatch(initCollection(someStuff));
        });
        fire.auth().onAuthStateChanged(function(user) {
            if (user) {
                dispatch(checkSignIn(true));
                dispatch(currentUser(user));
            } else {
                dispatch(checkSignIn(false));
                dispatch(currentUser({name:""}));
            }
        });
    }, [db,dispatch,change]);

  return (
      <Router>
        <div className="App">
          <Nav/>
          <Switch>
              <Route exact path={"/"}>{signedIn?<Redirect to={"/user"}/>:<Redirect to={"/signin"}/>}</Route>
              <Route path={"/admin"} component={Admin}/>
              <Route path={"/user"} component={UserPage}>{!signedIn?<Redirect to={"/signin"}/>:""}</Route>
              <Route path={"/signup"}>{signedIn?<Redirect to={"/user"}/>:<SignUpPage/>}</Route>
              <Route path={"/signin"} >{signedIn?<Redirect to={"/user"}/>:<SignIn/>}</Route>
          </Switch>
        </div>
      </Router>
  );
}