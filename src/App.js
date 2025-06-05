// src/App.js
import React from 'react';
// import { AuthProvider } from "./context/AuthContext";
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import PetForm from './components/PetRegistration/PetForm';
import GenerateQR from './components/GenerateQR/GenerateQR';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import PetDetails from './PetDetails';
// import MyPets from './components/MyPets/MyPets';


function App() {
  return (
    <div className="App">
      {/* <AuthProvider> </AuthProvider> */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<PetForm />} />
        {/* <Route path="/my-pets" element={<MyPets />} /> */}
        {/* <Route path="/my-pets" element={<MyPets userId={"<USER_ID_FROM_AUTH>"} />} /> */}

       <Route path="/generate-qr" element={<GenerateQR />} />
         <Route path="/login" element={<Login />} />
         <Route path="/signup" element={<Signup />} />
         {/* <Route path="/pet/:id" element={<PetDetails />} /> */}
       <Route path="/petdetails/:id" element={<PetDetails />} />


      </Routes>
    </div>
  );
}



export default App;
