/** Configuration applicative chargée depuis l'environnement. */
export default () => ({
  port: parseInt(process.env.PORT ?? '3000', 10),
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  nodeId: process.env.NODE_ID ?? 'admin-service',
});
