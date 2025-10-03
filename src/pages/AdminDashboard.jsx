import { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Not authenticated");
      setLoading(false);
      return;
    }
    fetch(`${API_BASE_URL}/admin/dashboard`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json().then((j) => ({ ok: r.ok, j })))
      .then(({ ok, j }) => {
        if (!ok) throw new Error(j.error || "Failed to load dashboard");
        setSummary(j);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="container">Loading...</div>;
  if (error) return <div className="container">Error: {error}</div>;
  if (!summary?.isAdmin) return <div className="container">Access denied</div>;

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      <p>Total Doctors: {summary.doctorCount}</p>
      <h3>Doctors</h3>
      <ul>
        {summary.doctors.map((d) => (
          <li key={d._id}>
            <strong>{d.name}</strong> — {d.qualification} — {d.phone}
          </li>
        ))}
      </ul>
    </div>
  );
}


