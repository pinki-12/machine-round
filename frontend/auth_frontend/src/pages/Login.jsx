import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);
      setUser(res.data.user);
      navigate("/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input placeholder="Email"
          onChange={e => setForm({...form, email:e.target.value})} />

        <input type="password" placeholder="Password"
          onChange={e => setForm({...form, password:e.target.value})} />

        <button>Login</button>
      </form>

      <div className="link" onClick={() => navigate("/")}>
        Don't have an account? Register
      </div>
    </div>
  );
};

export default Login;