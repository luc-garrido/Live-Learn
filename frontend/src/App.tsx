import { Routes, Route } from "react-router-dom"

import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import TrackPage from "./pages/TrackPage"
import ModulePage from "./pages/ModulePage"

function App() {
  return (
    <Routes>

      <Route path="/" element={<Login />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/track/:id" element={<TrackPage />} />

      <Route path="/module/:id" element={<ModulePage />} />

    </Routes>
  )
}

export default App