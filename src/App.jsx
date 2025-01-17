import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LocationsPage from "./pages/LocationsPage";
import AddPlacePage from "./pages/AddPlacePage";
//import DashboardPage from "./pages/DashboardPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/locations" element={<LocationsPage />} /> */}
        {/* {<Route path="/add-place" element={<AddPlacePage />} />} */}
        {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
