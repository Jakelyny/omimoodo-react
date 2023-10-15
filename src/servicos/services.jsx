import { getToken } from '../seguranca/Autenticacao';


const API_BASE_URL = 'http://localhost:8080';

const authenticatedRequest = async (url, method, body = null) => {
  const token = await getToken();

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  console.log(headers);

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${url}`, options);
  
  if(response.status === 403){
    return 0;
  }

  if (response.status === 204) {
    return null;
  }

  const data = await response.json();  

  if (!response.ok) {
    throw new Error(data.message || 'Ocorreu um erro na requisição.');
  }
  if(data.content){
    return data.content;
  }
  return data;
};

export const loginAPI = async (login, password) => {
  const body = {
    login,
    password,
  };

  return authenticatedRequest('/login', 'POST', body);
};


export const addUsuarioAPI = async (usuario) => {
  return authenticatedRequest('/usuario', 'POST', usuario);
};

export const getAllUsuariosAPI = async () => {
  return authenticatedRequest(`/usuario`, 'GET');
};

export const getUsuarioByIdAPI = async (id) => {
  return authenticatedRequest(`/usuario/${id}`, 'GET');
};

export const removeUsuarioByIdAPI = async (id) => {
  return authenticatedRequest(`/usuario/${id}`, 'DELETE');
};

export const updateUsuarioAPI = async (usuario) => {
  return authenticatedRequest(`/usuario`, 'PUT', usuario);
};

export const addConteudoAPI = async (conteudo) => {
  return authenticatedRequest('/conteudo', 'POST', conteudo);
};

export const getAllConteudosAPI = async () => {
  return authenticatedRequest(`/conteudo`, 'GET');
};

export const getConteudoByIdAPI = async (id) => {
  return authenticatedRequest(`/conteudo/${id}`, 'GET');
};

export const removeConteudoByIdAPI = async (id) => {
  return authenticatedRequest(`/conteudo/${id}`, 'DELETE');
};

export const updateConteudoAPI = async (conteudo) => {
  return authenticatedRequest(`/conteudo`, 'PUT', conteudo);
};