import allowedOrigins from "./allowedOrigins";
import credentials from "../middleware/credentials";
type origin = string | undefined;

const CorsOptions = {
  origin: (origin: origin, callback: any) => {
    if (origin !== undefined) {
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    } else {
      // callback(new Error("Not allowed by CORS")); //do not allow if theres no origin
      callback(null, true);
    }
  },
  credentials: true,
  // optionsSuccessStatus: 200,
};

export default CorsOptions;
