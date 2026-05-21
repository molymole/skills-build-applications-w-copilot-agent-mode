import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import Activities from "./components/Activities";
import Leaderboard from "./components/Leaderboard";
import Teams from "./components/Teams";
import Users from "./components/Users";
import Workouts from "./components/Workouts";
import { API_BASE_URL } from "./lib/api";
import "./App.css";

function Home() {
  return (
    <section className="page-section">
      <h2 className="section-title">OctoFit Tracker</h2>
      <p className="lead">
        Track members, team progress, and workouts across the full OctoFit stack.
      </p>
      <p className="api-base">
        API Base URL: <span>{API_BASE_URL}</span>
      </p>
    </section>
  );
}

function App() {
  return (
    <div className="app-shell container py-4 py-lg-5">
      <header className="mb-4">
        <h1 className="app-title">OctoFit Control Deck</h1>
        <p className="subtitle mb-3">
          React 19 presentation tier with environment-aware API routing.
        </p>
        <nav className="nav nav-pills flex-wrap gap-2">
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
          <NavLink className="nav-link" to="/users">
            Users
          </NavLink>
          <NavLink className="nav-link" to="/activities">
            Activities
          </NavLink>
          <NavLink className="nav-link" to="/teams">
            Teams
          </NavLink>
          <NavLink className="nav-link" to="/leaderboard">
            Leaderboard
          </NavLink>
          <NavLink className="nav-link" to="/workouts">
            Workouts
          </NavLink>
        </nav>
      </header>

      <main className="content-panel card shadow-sm">
        <div className="card-body">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
