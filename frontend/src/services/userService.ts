import { apiFetch } from "./api";

import type {
  CreateUserDTO,
  LoginDTO,
  UserDTO,
  AuthResponseDTO,
} from "../types/api";


export function createUser(data: CreateUserDTO): Promise<UserDTO> {
  return apiFetch<UserDTO>("/users", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function getProfile(): Promise<UserDTO> {
  return apiFetch<UserDTO>("/users/profile");
}

export function login(data: LoginDTO): Promise<AuthResponseDTO> {
  return apiFetch<AuthResponseDTO>("/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
