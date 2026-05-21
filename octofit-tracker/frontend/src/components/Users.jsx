import { useEffect, useState } from "react";
import { getApiUrl, normalizeCollectionResponse } from "../lib/api";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadUsers() {
      try {
        setLoading(true);
        const response = await fetch(getApiUrl("/users/"));

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        const items = normalizeCollectionResponse(payload);

        if (active) {
          setUsers(items);
        }
      } catch (loadError) {
        if (active) {
          setError(loadError.message || "Unable to load users.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadUsers();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="page-section">
      <h2 className="section-title">Users</h2>
      {loading && <p>Loading users...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th>Username</th>
                <th>Display Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id || user.id || user.username}>
                  <td>{user.username || "-"}</td>
                  <td>{user.displayName || "-"}</td>
                  <td>{user.email || "-"}</td>
                  <td>{user.role || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Users;
