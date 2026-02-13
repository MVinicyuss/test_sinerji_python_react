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

      const user = await createUser(form);

      console.log("Usuário criado:", user);

      alert("Usuário cadastrado com sucesso!");
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Erro inesperado");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Cadastro</h1>

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
