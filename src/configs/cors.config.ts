const corsConfig = {
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  origin: [process.env.CLIENT_URL],
};

export default corsConfig;
