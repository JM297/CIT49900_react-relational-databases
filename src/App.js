import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Home from "./components/home/Home";
import Nav from "./components/nav/Nav";
import Admin from "./components/admin/Admin";
import fire from "./firebase/Fire";
import {useDispatch, useSelector} from "react-redux";
import {initCollection} from "./redux/actions/setActions";
import UserPage from "./components/UserPage";

export default function App() {
    const change = useSelector(state => state.change);
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
    }, [db,dispatch,change]);

  return (
      <Router>
        <div className="App">
          <Nav/>
          <Switch>
            <Route exact path={"/"} component={Home}/>
              <Route path={"/admin"} component={Admin}/>
              <Route path ={"/user"} component={UserPage}/>
          </Switch>
        </div>
      </Router>
  );
}
