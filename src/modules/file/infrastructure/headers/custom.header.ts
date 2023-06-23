export const customAuthHeader = [
  {
    name: 'nameApp',
    description: 'Nombre de aplicación',
    required: process.env.REQUIRE_AUTH == 'true',
  },
  {
    name: 'authorizer',
    description: 'Nombre del paquete autorizador del token. ejemplo: jsonwebtoken, JwtService(@nest/jwt)',
    required: process.env.REQUIRE_AUTH == 'true',
  },
];
