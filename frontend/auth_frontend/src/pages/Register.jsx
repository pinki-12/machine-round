import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", form);
      alert("Registered Successfully");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input placeholder="Name"
          onChange={e => setForm({...form, name:e.target.value})} />

        <input placeholder="Email"
          onChange={e => setForm({...form, email:e.target.value})} />

        <input type="password" placeholder="Password"
          onChange={e => setForm({...form, password:e.target.value})} />

        <button>Register</button>
      </form>

      <div className="link" onClick={() => navigate("/login")}>
        Already have an account? Login
      </div>
    </div>
  );
};

export default Register;