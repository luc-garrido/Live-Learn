import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import TrackPage from "./pages/TrackPage";
import ModulePage from "./pages/ModulePage";
import GenerateTrail from "./pages/GenerateTrail";




function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/generate-trail" element={<GenerateTrail />} />
      <Route path="/track/:id" element={<TrackPage />} />
      <Route path="/module/:id" element={<ModulePage />} />
      {/* <Route path="/profile" element={<Profile />} /> */}
    </Routes>
  );
}

export default App;