export const customAuthHeader = [
  {
    name: 'nameApp',
    description: 'Nombre de aplicación',
    required: true,
  },
  {
    name: 'authorizer',
    description: 'Nombre del paquete autorizador del token. ejemplo: jsonwebtoken, JwtService(@nest/jwt)',
    required: true,
  },
];
