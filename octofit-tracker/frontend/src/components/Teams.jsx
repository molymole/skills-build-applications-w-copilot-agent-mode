import { useEffect, useState } from "react";
import { normalizeCollectionResponse } from "../lib/api";

const teamsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams`
  : "http://localhost:8000/api/teams";

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadTeams() {
      try {
        setLoading(true);
        const response = await fetch(teamsEndpoint);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        const items = normalizeCollectionResponse(payload);

        if (active) {
          setTeams(items);
        }
      } catch (loadError) {
        if (active) {
          setError(loadError.message || "Unable to load teams.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadTeams();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="page-section">
      <h2 className="section-title">Teams</h2>
      {loading && <p>Loading teams...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th>Team Name</th>
                <th>Members</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team._id || team.id || team.name}>
                  <td>{team.name || "-"}</td>
                  <td>{Array.isArray(team.members) ? team.members.length : 0}</td>
                  <td>
                    {team.createdAt ? new Date(team.createdAt).toLocaleDateString() : "-"}
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

export default Teams;
