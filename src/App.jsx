import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LocationsPage from "./pages/LocationsPage";
import AddPlacePage from "./pages/AddPlacePage";
import DashboardPage from "./pages/DashboardPage";
import AuthPage from "./pages/AuthPage";
import Navbar from "./components/Navbar";

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem("token");

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return element;
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/locations" element={<LocationsPage />} />
        <Route
          path="/add-place"
          element={<ProtectedRoute element={<AddPlacePage />} />}
        />
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<DashboardPage />} />}
        />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
