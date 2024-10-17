import { Request, Response, Router } from "express";
import user, { userTyp } from "../../db/schemas/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secret = process.env.secret || "secret";

const router = Router();

router.post("/signup", async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const data = await user.create({
      email,
      password: hashedPassword,
    });

    console.log(data);
    res.status(400).json({
      message: "user created",
    });
  } catch (error) {
    console.error(error);
    res.status(411).json({
      message: "server error",
    });
  }
});

router.post("/signin", async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;

  const data = await user.findOne({ email });

  console.log(data);

  if (!data) {
    res.status(404).json({ message: "user not found" });
  }

  const hashedPassword = await bcrypt.compare(password, data?.password || "");

  if (!hashedPassword) {
    res.status(411).json({ message: "incorrect password" });
  }

  const token = jwt.sign(JSON.stringify(data) || "", secret);
  res.status(200).json({ token });
});

export default router;
