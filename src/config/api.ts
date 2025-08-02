// src/config/api.js
export const API_BASE_URL = 'http://85.31.62.33:3000';

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
  GASTOS_UPDATE: '/controller/updateGasto',
  RECOVER_PASSWORD_SEND_CODE: '/auth/recoverPassword/forgot',
  RECOVER_PASSWORD_VALIDATE_CODE: '/auth/recoverPassword/verify',
  RECOVER_PASSWORD_RESET: '/auth/recoverPassword/reset',

  UPLOAD_PICTURE: '/upload/upload-foto'
};