// In production, use environment variables!
export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'dev-secret-change-in-production',
};
