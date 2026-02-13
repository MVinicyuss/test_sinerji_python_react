import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../services/userService";
import type { UserDTO } from "../types/api";

export default function Home() {
  const navigate = useNavigate();

  const [user, setUser] = useState<UserDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await getProfile();
        setUser(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  if (loading) return <h1>Carregando...</h1>;

  if (!user) return <h1>Usuário não autenticado</h1>;

  return (
    <div>
      <h1>Home</h1>

      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Nome:</strong> {user.nome}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
