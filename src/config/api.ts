// src/config/api.js
export const API_BASE_URL = 'http://192.168.1.101:3000';

export const ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  REGISTER_FINANCE: '/auth/registerFinance',
  CATEGORIAS: '/categories/categorias',
  CATEGORIA_POR_USUARIO: '/auth/categoriasSelecionadas',
  USER_INFO: '/auth/userInfo',
  UPDATE_USER: '/auth/updateUser',
  GASTOS: '/expenses/gastos',
  EXTRATO: '/expenses/extract/extrato',
  GASTOS_DELETE: '/controller/deleteGasto',
  GASTOS_UPDATE: '/controller/updateGasto'
};