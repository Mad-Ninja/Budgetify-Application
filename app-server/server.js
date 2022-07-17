import { app } from "./app.js";
import { config } from "dotenv";

config();

app.listen(process.env.PORT || 80, (error) => {
  error
    ? console.log(error)
    : console.log(`listening port ${process.env.PORT || 80 }`);
});
