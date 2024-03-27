import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import UserRegistration from "./pages/UserRegistration"
import Users from "./pages/Users"
import EditUser from "./pages/EditUser"
import DayUsers from "./pages/DayUsers"
import WeekUsers from "./pages/WeekUsers"


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
        <Route path="/day-users" element={<DayUsers/>} />
        <Route path="/week-users" element={<WeekUsers/>} />
      </Routes>
    </>
  )
}

export default App
