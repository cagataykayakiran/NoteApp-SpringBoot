
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import AddUser from "./users/AddUser";
import Home from "./pages/Home";
import Navbar from "./layout/Navbar";
import EditUser from "./users/EditUser";


function App() {
  return (
      <div className={"App"}>
        <BrowserRouter>
            <Navbar/>
            <Routes>
                    <Route exact path={"/"} element={<Home/>}/>
                    <Route exact path={"/save"} element={<AddUser />}/>
                    <Route exact path={"/edit/:id"} element={<EditUser />}/>
            </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
