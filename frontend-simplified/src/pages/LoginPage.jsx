import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null); // reset error

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      // Login failed
      if (!response.ok) {
        setError(data.error || "Invalid email or password");
        return;
      }

      // Login successful → save token
      localStorage.setItem("token", data.token);

      // Redirect to homepage
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md rounded-md p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

      {error && (
        <p className="text-red-600 text-center mb-4 font-medium">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            required
            className="w-full border px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            required
            className="w-full border px-3 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
