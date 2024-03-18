import './App.css';
import React from "react"
import Auth from "./Pages/Auth/Auth"
import Home from './Pages/Home/Home'
import Profile from "./Pages/Profile/Profile";
import RequiredAuth from "./Hooks/RequiredAuth"
import Layout from "./Hooks/Layout"
import {Routes,Route} from "react-router-dom"
import Chat from './Pages/Chat/Chat'

function App() {
  return (
    <div className="App">
       <div className='blur' style={{top:'-18%',right:'0'}}>
       </div>
       <div className='blur' style={{top:'30%',left:'-8rem'}}>
       </div>
       <Routes>
      
      <Route path="/" element={<Layout/>}/>
      <Route  index element={<Auth/>}/>
        {/*Protected Routes*/}
      <Route path="/home" index element={<RequiredAuth><Home/></RequiredAuth>}/>
      <Route path="/profile/:id" element={<RequiredAuth><Profile/></RequiredAuth>}/>
      <Route path="/chat" element={<RequiredAuth><Chat/></RequiredAuth>}/>
     </Routes>
    </div>
  )
}

export default App;
