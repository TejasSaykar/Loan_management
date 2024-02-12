import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import UserRegistration from "./pages/UserRegistration"
import Users from "./pages/Users"
import EditUser from "./pages/EditUser"


function App() {

  return (
    <>
      <div style={{marginBottom: "3.5rem"}}>
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/registration" element={ <UserRegistration /> } />
        <Route path="/users" element={ <Users /> } />
        <Route path="/edit-user/:id" element={ <EditUser /> } />
      </Routes>
    </>
  )
}

export default App
