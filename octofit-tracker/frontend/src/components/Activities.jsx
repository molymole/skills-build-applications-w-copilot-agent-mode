import { useEffect, useState } from "react";
import { normalizeCollectionResponse } from "../lib/api";

const inferredCodespaceName =
  typeof window !== "undefined"
    ? (window.location.hostname.match(/^(.*)-\d+\.app\.github\.dev$/)?.[1] ?? "")
    : "";
const codespaceName = import.meta.env.VITE_CODESPACE_NAME || inferredCodespaceName;

const activitiesEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities`
  : "http://localhost:8000/api/activities";

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadActivities() {
      try {
        setLoading(true);
        const response = await fetch(activitiesEndpoint);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        const items = normalizeCollectionResponse(payload);

        if (active) {
          setActivities(items);
        }
      } catch (loadError) {
        if (active) {
          setError(loadError.message || "Unable to load activities.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadActivities();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="page-section">
      <h2 className="section-title">Activities</h2>
      {loading && <p>Loading activities...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th>User</th>
                <th>Type</th>
                <th>Duration (min)</th>
                <th>Calories</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id || activity.id}>
                  <td>{activity.user?.displayName || activity.user?.username || "-"}</td>
                  <td>{activity.activityType || "-"}</td>
                  <td>{activity.durationMinutes ?? "-"}</td>
                  <td>{activity.caloriesBurned ?? "-"}</td>
                  <td>
                    {activity.activityDate
                      ? new Date(activity.activityDate).toLocaleDateString()
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Activities;
