export const isLocalMode = (): boolean => !!process.env.DATABASE_URL;

export const getDbConfig = () => ({
  connectionString: process.env.DATABASE_URL!,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

export const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET environment variable is required in local mode");
  return secret;
};

export const getCvStoragePath = (): string => {
  return process.env.LOCAL_CV_STORAGE_PATH ?? "/data/cvs";
};
