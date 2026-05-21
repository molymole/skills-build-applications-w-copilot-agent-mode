import { useEffect, useState } from "react";
import { getApiUrl, normalizeCollectionResponse } from "../lib/api";

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadLeaderboard() {
      try {
        setLoading(true);
        const response = await fetch(getApiUrl("/leaderboard/"));

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        const items = normalizeCollectionResponse(payload);

        if (active) {
          setEntries(items);
        }
      } catch (loadError) {
        if (active) {
          setError(loadError.message || "Unable to load leaderboard.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadLeaderboard();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="page-section">
      <h2 className="section-title">Leaderboard</h2>
      {loading && <p>Loading leaderboard...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Score</th>
                <th>Team</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={entry._id || entry.id || `${entry.user?.username}-${index}`}>
                  <td>{entry.rank ?? index + 1}</td>
                  <td>{entry.user?.displayName || entry.user?.username || "-"}</td>
                  <td>{entry.score ?? entry.points ?? "-"}</td>
                  <td>{entry.team?.name || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Leaderboard;
