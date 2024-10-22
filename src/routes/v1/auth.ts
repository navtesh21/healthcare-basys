import { Request, Response, Router } from "express";
import user, { userTyp } from "../../db/schemas/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secret = process.env.secret || "secret";

const router = Router();

router.post("/signup", async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const data = await user.create({
      email,
      password,
    });

    console.log(data);
    res.status(200).json({
      message: "user created",
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(411).json({
      message: "server error",
    });
    return;
  }
});

router.post("/signin", async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;

  const data = await user.findOne({ email });

  console.log(data);

  if (!data) {
    res.status(404).json({ message: "user not found" });
    return;
  }

  if (password != data?.password) {
    res.status(403).json({ message: "incorrect password" });
    return;
  }

  const token = jwt.sign(JSON.stringify(data) || "", secret);
  res.status(200).json({ token });
});

export default router;
