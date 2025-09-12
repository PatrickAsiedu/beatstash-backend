import allowedOrigins from "./allowedOrigins";

type origin = string | undefined;

const CorsOptions = {
  origin: (origin: origin, callback: any) => {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  credentials: true,

  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};

export default CorsOptions;
