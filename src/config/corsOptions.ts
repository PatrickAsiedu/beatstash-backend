import allowedOrigins from "./allowedOrigins";

type Origin = string | undefined;

const CorsOptions = {
  origin: (origin: Origin, callback: (err: Error | null, allow?: boolean) => void) => {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin) {
      callback(null, true);
      return;
    }

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};

export default CorsOptions;
