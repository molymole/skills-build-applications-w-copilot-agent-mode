import { useEffect, useState } from "react";
import { getApiUrl, normalizeCollectionResponse } from "../lib/api";

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadWorkouts() {
      try {
        setLoading(true);
        const response = await fetch(getApiUrl("/workouts/"));

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        const items = normalizeCollectionResponse(payload);

        if (active) {
          setWorkouts(items);
        }
      } catch (loadError) {
        if (active) {
          setError(loadError.message || "Unable to load workouts.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadWorkouts();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="page-section">
      <h2 className="section-title">Workouts</h2>
      {loading && <p>Loading workouts...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Difficulty</th>
                <th>Duration (min)</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout._id || workout.id || workout.name}>
                  <td>{workout.name || "-"}</td>
                  <td>{workout.category || "-"}</td>
                  <td>{workout.difficulty || "-"}</td>
                  <td>{workout.durationMinutes ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Workouts;
