import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { getXataClient } from "./xata";
import { param, body, matchedData, validationResult } from "express-validator";

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

app.get(
  "/api/v1/users/:id",
  param("id").isString().escape(),
  async (req: Request, res: Response) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      res.status(400).json({
        success: false,
        message: "Validation error!",
        errors: err.array(),
      });
    } else {
      const { id } = matchedData<{
        id: string;
      }>(req);

      try {
        const record = await xata.db.users.read(id);

        if (!record) {
          res.status(404).json({
            success: false,
            message: "Not Found",
          });
        } else {
          res.status(200).json({
            success: true,
            payload: record,
          });
        }
      } catch (error) {
        res.status(500).json({
          success: false,
          error,
        });
      }
    }
  },
);

app.post(
  "/api/v1/users",
  body(["userName", "displayName"]).notEmpty().isString().escape(),
  async (req: Request, res: Response) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      res.status(400).json({
        success: false,
        message: "Validation error!",
        errors: err.array(),
      });
    } else {
      const { userName, displayName } = matchedData<{
        userName: string;
        displayName: string;
      }>(req);
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
    }
  },
);

app.put(
  "/api/v1/users/:id",
  param("id").isString().escape(),
  body(["userName", "displayName"]).notEmpty().isString().escape(),
  async (req: Request, res: Response) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      res.status(400).json({
        success: false,
        message: "Validation error!",
        errors: err.array(),
      });
    } else {
      const { id, userName, displayName } = matchedData<{
        id: string;
        userName: string;
        displayName: string;
      }>(req);

      try {
        const exists = await xata.db.users.read(id);

        if (!exists) {
          res.status(404).json({
            success: false,
            message: "Not found",
          });
        } else {
          const record = await xata.db.users.createOrReplace(id, {
            userName,
            displayName,
          });

          res.status(200).json({
            success: true,
            payload: record,
          });
        }
      } catch (error) {
        res.status(500).json({
          success: false,
          error,
        });
      }
    }
  },
);

app.patch(
  "/api/v1/users/:id",
  param("id").isString().escape(),
  body(["userName", "displayName"]).notEmpty().isString().escape(),
  async (req: Request, res: Response) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      res.status(400).json({
        success: false,
        message: "Validation error!",
        errors: err.array(),
      });
    } else {
      const { id, userName, displayName } = matchedData<{
        id: string;
        userName: string;
        displayName: string;
      }>(req);

      try {
        const exists = await xata.db.users.read(id);

        if (!exists) {
          res.status(404).json({
            success: false,
            message: "Not Found",
          });
        } else {
          const record = await exists.update(
            {
              userName,
              displayName,
            },
            {
              ifVersion: exists.xata_version,
            },
          );

          res.status(200).json({
            success: true,
            payload: record,
          });
        }
      } catch (error) {
        res.status(500).json({
          success: false,
          error,
        });
      }
    }
  },
);

app.delete(
  "/api/v1/users/:id",
  param("id").isString().escape(),
  async (req: Request, res: Response) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      res.status(400).json({
        success: false,
        message: "Validation error!",
        errors: err.array(),
      });
    } else {
      const { id } = matchedData<{
        id: string;
      }>(req);

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
    }
  },
);

app.listen(port, () => {
  console.log(
    `[server]: Server TypeScript is running at http://localhost:${port} 😂😂😂😂`,
  );
});
