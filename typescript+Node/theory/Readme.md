# Complete Guide to Building a TypeScript + Node.js CRUD API with Express
TypeScript and Node.js are a powerful combination for building scalable and maintainable backend applications. In this guide, we will walk through the process of building a CRUD API using TypeScript, Node.js, and Express. We'll cover everything from setting up the project to implementing GET, POST, PUT, and DELETE operations with proper error handling and TypeScript interfaces.

## Prerequisites

- Node.js (Latest LTS version recommended)

- npm or yarn (Package managers)

- TypeScript (Installed globally using npm install -g typescript)

## Step 1 : Initialize a TypeScript Project

First, create a new directory for your project and initialize it as a Node.js project :

```
    mkdir typescript-node-api && cd typescript-node-api
    npm init -y
```

Next, install TypeScript and required dependencies:

```
    npm install typescript ts-node @types/node --save-dev
```

Initialize TypeScript in the project:

```
    tsc --init
```

This will generate a tsconfig.json file. Modify it to include the following essential settings:

```
    {
        "compilerOptions": {
            "target": "ES6",
            "module": "CommonJS",
            "outDir": "./dist",
            "rootDir": "./src",
            "strict": true
        }
    }
```

## Step 2 : Install Express and Required Dependencies

Install Express and TypeScript definitions :

```
    npm install express
    npm install @types/express --save-dev
```

## Step 3 : Set Up Express Server

Create a new directory src and add a file server.ts inside it :

```
    import express, { Request, Response } from "express";
    const app = express();
    const PORT = 8080;

    app.use(express.json());

    app.get("/", (req: Request, res: Response) => {
        res.status(200).json({ msg: "Welcome to the API" });
    });

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
```

Run the server using:

```
    npx ts-node src/server.ts
```

## Step 4 : Implement CRUD Operations

Define a simple interface for our data model :

```
    interface Expense {
        id: string;
        name: string;
        age: number;
        income: number;
    }
```
Now, implement CRUD operations inside server.ts :

### 1. In-Memory Database

```
    let arr: Expense[] = [{ id: "0", name: "Sam", age: 22, income: 23000 }];
```

### 2. GET All Data

```
    app.get("/data", (req: Request, res: Response) => {
        res.status(200).json({ msg: "All Data", data: arr });
    });
```

### 3. POST (Add New Entry)

```
    app.post("/data", (req: Request, res: Response) => {
        const { name, age, income } = req.body;
        if (!name || !age || !income) {
            return res.status(400).json({ msg: "All fields are required" });
        }
        const id = arr.length.toString();
        const newEntry: Expense = { id, name, age, income };
        arr.push(newEntry);
        res.status(201).json({ msg: "Added successfully", data: newEntry });
    });
```

### 4. PUT (Update Entry by ID)

```
    app.put("/data/:id", (req: Request, res: Response) => {
    const { name, age, income } = req.body;
    const id = req.params.id;
    const index = arr.findIndex((el) => el.id === id);

    if (index !== -1) {
        arr[index] = { id, name, age, income };
        res.status(200).json({ msg: "Updated successfully", data: arr[index] });
    } else {
        res.status(404).json({ msg: "Document not found" });
    }
    });
```

### 5. DELETE (Remove Entry by ID)

```
    app.delete("/data/:id", (req: Request, res: Response) => {
    const id = req.params.id;
    arr = arr.filter((el) => el.id !== id);
    res.status(200).json({ msg: "Deleted Successfully" });
    });
```

## Step 5 : Connecting to a Database (Optional)

If you want to connect to MongoDB, install mongoose:

```
    npm install mongoose
    npm install @types/mongoose --save-dev
```

Create a new file src/config/db.ts:

```
    import mongoose from "mongoose";
    const connectDB = async () => {
    try {
        await mongoose.connect("your-mongodb-url", { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("MongoDB Connected...");
    } catch (err) {
        console.error("Database connection error:", err);
        process.exit(1);
    }
    };
    export default connectDB;
```

Import and call connectDB() in server.ts:

```
    import connectDB from "./config/db";
    connectDB();
```

## Step 6 : Run Your Application

To start the API, run:

```
    npx ts-node src/server.ts
```
API is running at http://localhost:8080.