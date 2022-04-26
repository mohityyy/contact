import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Addcontact from "../pages/Contact/AddContact";
import Header from "../components/Header/Header";

const Router = () => {
  return (
    <div>
        <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-contact" element={<Addcontact />} />

        <Route path="/edit-contact/:id" element={<Addcontact />} />
      </Routes>
    </div>
  );
};

export default Router;
