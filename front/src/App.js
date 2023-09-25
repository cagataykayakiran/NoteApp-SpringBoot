
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import AddNote from "./components/note/AddNote";
import Home from "./components/pages/Home";
import Navbar from "./components/layout/Navbar";
import EditNote from "./components/note/EditNote";
import Auth from "./components/auth/Auth";
import RequireAuth from "./components/root/RequireAuth";

function App() {

  return (
      <div className={"App"}>
        <BrowserRouter>
            <Navbar/>
            <Routes>
                    <Route exact path={"/"} element={<Home />}/>
                    <Route exact path={"/save"} element={<AddNote />}/>
                    <Route exact path={"/edit/:id"} element={<EditNote />}/>
                    <Route exact path={"/login"} element={<Auth />}/>
                    <Route element={<RequireAuth />}>
                        <Route path="/" element={<Home/>}/>
                    </Route>
            </Routes>
        </BrowserRouter>
      </div>
  );
}
export default App;
