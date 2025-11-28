import { useState } from "react";

export function useLogin() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return false;
      }

      // Save the token
      sessionStorage.setItem("accessToken", data.token);

      setLoading(false);
      return true;
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
      return false;
    }
  };

  return { login, loading, error };
}
