import morgan from "morgan";

export const logger = () => {
  if (process.env.NODE_ENV === "development") {
    return morgan("dev");
  } else {
    return morgan("combined");
  }
};
