import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/userService";
import type { LoginDTO } from "../types/api";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState<LoginDTO>({
    email: "",
    senha: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await login(form);

      localStorage.setItem("token", data.access_token);

      alert("Login realizado com sucesso!");
      navigate("/home");
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Erro desconhecido");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="senha"
          type="password"
          placeholder="Senha"
          value={form.senha}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <br/>

      <p>
        Não tem uma conta?{" "}
        <a href="/register" onClick={(e) => { e.preventDefault(); navigate("/register"); }}>
          Cadastre-se
        </a>
      </p>
    </div>
  );
}
