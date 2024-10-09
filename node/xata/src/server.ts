import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { getXataClient } from "./xata";

dotenv.config();

const xata = getXataClient();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/api/v1/users", async (req: Request, res: Response) => {
  try {
    const records = await xata.db.users.getMany();

    res.status(200).json({
      success: true,
      payload: records,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
});

app.get("/api/v1/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const record = await xata.db.users.read(id);

    if (!record) {
      res.status(404).json({
        success: false,
        message: "Not Found",
      });
    }

    res.status(200).json({
      success: true,
      payload: record,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
});

app.post("/api/v1/users", async (req: Request, res: Response) => {
  const { userName, displayName } = req.body;

  try {
    const record = await xata.db.users.create({
      userName,
      displayName,
    });

    res.status(201).json({
      success: true,
      payload: record,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
});

app.put("/api/v1/users/:id", async (req: Request, res: Response) => {
  const {
    body: { userName, displayName },
    params: { id },
  } = req;

  try {
    const record = await xata.db.users.createOrReplace(id, {
      userName,
      displayName,
    });

    if (!record) {
      res.status(404).json({
        success: false,
        message: "Not Found",
      });
    }

    res.status(200).json({
      success: true,
      payload: record,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
});

app.patch("/api/v1/users/:id", async (req: Request, res: Response) => {
  const {
    body: { userName, displayName },
    params: { id },
  } = req;

  try {
    const record = await xata.db.users.update(id, { userName, displayName });

    if (!record) {
      res.status(404).json({
        success: false,
        message: "Not Found",
      });
    }

    res.status(200).json({
      success: true,
      payload: record,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
});

app.delete("/api/v1/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const record = await xata.db.users.delete(id);

    if (!record) {
      res.status(404).json({
        success: false,
        message: "Not Found",
      });
    }

    res.status(200).json({
      success: true,
      payload: record,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
});

app.listen(port, () => {
  console.log(
    `[server]: Server TypeScript is running at http://localhost:${port} 😂😂😂😂`,
  );
});
