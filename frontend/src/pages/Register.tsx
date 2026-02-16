import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../services/userService";
import type { CreateUserDTO } from "../types/api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState<CreateUserDTO>({
    nome: "",
    email: "",
    senha: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);

      const user = await createUser(form);

      console.log("Usuário criado:", user);

      navigate("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Erro inesperado");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Cadastro</h1>

      {error && (
        <div
          style={{
            backgroundColor: "#f8d7da",
            color: "#721c24",
            padding: "12px 16px",
            borderRadius: "4px",
            border: "1px solid #f5c6cb",
            marginBottom: "16px",
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <input
            name="nome"
            placeholder="Nome"
            value={form.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <input
            name="senha"
            type="password"
            placeholder="Senha"
            value={form.senha}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>

      <br/>

      <p>
        Já tem uma conta?{" "}
        <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
          Faça login
        </a>
      </p>
    </div>
  );
}
