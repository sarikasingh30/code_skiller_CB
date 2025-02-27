import express, { Request, Response } from "express";
import connectDB from "./config/db";
const app = express();
const PORT = 8080;
app.use(express.json());
interface Expense {
    id: string;
    name: string;
    age: number;
    income: number;
  }
let arr:Expense[] = [{ id: "0", name: "Sam", age: 22, income: 23000 }];

app.post("/", (req: Request, res: Response) => {
  const { name, age, income } = req.body;
  const id = arr.length.toString();
  arr = [...arr, { id, name, age, income }];
  res
    .status(201)
    .json({
      msg: "Document added successfully...",
      data: { name, age, income },
    });
});

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ msg: "All Data...", data: arr });
});
app.put("/:id", (req: Request, res: Response) => {
  const { name, age, income } = req.body;
  const id = req.params.id;
  let index;
  index = arr.findIndex((el) => el.id == id);
  if (index != -1) {
    arr[index] = { id, ...req.body };
    res.status(200).redirect("/");
  } else {
    res.status(404).send("Document not found");
  }
});
app.delete("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  arr = arr.filter((el) => el.id !== id);
  res.status(200).json({ msg: "Document Deleted Successfully..." });
});
connectDB()
  .then(() => {
    app.listen(PORT, (err) => {
      if (err) {
        console.log("Error : ", err);
      } else {
        console.log(`Listening on Port : ${PORT}`);
      }
    });
  })
  .catch((err) => {
    console.log("Error in Connection : ", err);
  });
