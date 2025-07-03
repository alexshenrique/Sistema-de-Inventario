import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const getEquipamentos = async (params = {}) => {
  const response = await api.get("/equipamentos", { params });
  // Retorna sempre o array de equipamentos da chave correta
  if (Array.isArray(response.data.itens)) {
    return response.data.itens;
  } else if (Array.isArray(response.data.items)) {
    return response.data.items;
  } else if (Array.isArray(response.data.equipamentos)) {
    return response.data.equipamentos;
  } else if (Array.isArray(response.data)) {
    return response.data;
  } else {
    return [];
  }
};

export default api;

export async function criarEquipamento(equipamento) {
  const response = await fetch('http://localhost:5000/equipamentos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(equipamento)
  });
  return response.json();
}

// Usuários
export const getUsuarios = async (params) => {
  const response = await api.get("/usuarios", { params });
  return response.data.itens || [];
};

export const criarUsuario = async (dados) => {
  const response = await api.post("/usuarios", dados);
  return response.data;
};

export const editarUsuario = async (id, dados) => {
  const response = await api.put(`/usuarios/${id}`, dados);
  return response.data;
};

export const deletarUsuario = async (id) => {
  const response = await api.delete(`/usuarios/${id}`);
  return response.data;
};

// Manutenções
export const getManutencoes = async (params) => {
  const response = await api.get("/manutencoes", { params });
  return response.data.itens || [];
};

export const criarManutencao = async (dados) => {
  const response = await api.post("/manutencoes", dados);
  return response.data;
};

export const editarManutencao = async (id, dados) => {
  const response = await api.put(`/manutencoes/${id}`, dados);
  return response.data;
};

export const deletarManutencao = async (id) => {
  const response = await api.delete(`/manutencoes/${id}`);
  return response.data;
};

export const deletarEquipamento = async (id) => {
  const response = await api.delete(`/equipamentos/${id}`);
  return response.data;
};

export const editarEquipamento = async (id, dados) => {
  const response = await api.put(`/equipamentos/${id}`, dados);
  return response.data;
};