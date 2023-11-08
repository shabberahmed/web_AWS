import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLogin from "./components/UserLogin";
import AdminSignup from "./components/AdminSignup";
import UserSignup from "./components/UserSignUp";
import UserHome from "./components/UserHome";
import UserPageDataPrint from "./components/UserPageDataPrint";
import AdminPage from "./components/AdminPage";
import ListOfkaryakartha from "./components/ListOfkaryakartha";
import Askleader from "./components/Askleader";
import Allforms from "./components/Allforms";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserLogin />}></Route>
          <Route path="/home" element={<UserHome />}></Route>
          <Route path="/print" element={<UserPageDataPrint/>}></Route>
          <Route path="/admin/8899" element={<AdminSignup />}></Route>
          <Route path="/admin/page" element={<AdminPage />}></Route>
          <Route path="/user/login" element={<UserHome />}></Route>
          <Route path="user/signup" element={<UserSignup />}></Route>
          <Route path="/list" element={<ListOfkaryakartha />}></Route>
          <Route path="/Askleader" element={<Askleader />}></Route>
          <Route path="/all" element={<Allforms />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
