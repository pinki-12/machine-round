import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await API.get("/auth/profile");
      setUser(res.data);
      setForm({
        name: res.data.name,
        email: res.data.email,
        password: ""
      });
    } catch {
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    await API.put("/auth/update", form);
    alert("Profile Updated");
    fetchProfile();
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete account?")) return;
    await API.delete("/auth/delete");
    navigate("/login");
  };

  const handleLogout = async () => {
    await API.post("/auth/logout");
    navigate("/login");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "15px auto" }}>
      
      {user && (
        <div style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
        }}>
          <h3>Welcome, {user.name}</h3>
          <p>{user.email}</p>
        </div>
      )}

      <div className="container">
        <h3>Update Profile</h3>

        <input value={form.name}
          onChange={e => setForm({...form, name:e.target.value})} />

        <input value={form.email}
          onChange={e => setForm({...form, email:e.target.value})} />

        <input type="password"
          placeholder="New Password"
          value={form.password}
          onChange={e => setForm({...form, password:e.target.value})} />

        <button onClick={handleUpdate}>Update</button>

        <button onClick={handleLogout} style={{ marginTop: "10px", background: "gray" }}>
          Logout
        </button>

        <button onClick={handleDelete} style={{ marginTop: "10px", background: "red" }}>
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Dashboard;