import cors from "cors";
import express from "express";
import {ExampleController} from "./controller/ExampleController";

const app = express();
app.use(cors()); // Enable CORS for all routes
const port = 3000;

// Route for creating an Assistant
app.use(express.json());

// Route for creating a File
app.post("/create", ExampleController.create);
app.get("/list", ExampleController.list);
app.get("/get/:id", ExampleController.get);
app.put("/update", ExampleController.update);
app.delete("/delete/:id", ExampleController.delete);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
