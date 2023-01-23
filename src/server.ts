import { employeeRouter } from "./employee.routes";
import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { connectToDatabase } from "./database";
 
// Load environment variables from the .env file, where the ATLAS_URI is configured
dotenv.config();
 
const { ATLAS_URI } = process.env;
const PORT = process.env.PORT || 3030;
if (!ATLAS_URI) {
   console.error("No ATLAS_URI environment variable has been defined in config.env");
   process.exit(1);
}
 
connectToDatabase(ATLAS_URI)
   .then(() => {
       const app = express();
       app.use(cors());
 
       // start the Express server
       app.use("/employees", employeeRouter);
       app.listen(PORT, () => {
           console.log(`Server running at ${PORT}`);
       });
 
   })
   .catch(error => console.error(error));