// Representa usuário vindo da API
export type UserDTO = {
  id: number;
  nome: string;
  email: string;
};

export type CreateUserDTO = {
  nome: string;
  email: string;
  senha: string;
};

export type LoginDTO = {
  email: string;
  senha: string;
};

export type AuthResponseDTO = {
  access_token: string;
  token_type: string;
};
