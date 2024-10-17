import { Request, Response, Router } from "express";
import { authMiddleware } from "../../middleware/auth";
import patient from "../../db/schemas/patient";

const router = Router();

router.post("/create", authMiddleware, async (req: Request, res: Response) => {
  if (!res.locals.user._id) {
    res.json({ message: "unauthorized" });
  }
  try {
    const data = await patient.create({
      name: req.body.name,
      age: req.body.age,
      treatmentPlan: req.body.treatmentPlan,
      medicalHistory: req.body.medicalHistory,
      labDetails: req.body.labDetails,
      doctorId: res.locals.user._id,
    });
    console.log(data);
    res.json({ message: "data inserted" });
  } catch (error) {
    console.log(error);
  }
});

router.post("/create", async (req: Request, res: Response) => {
  try {
    const data = await patient.create({
      name: req.body.name,
      age: req.body.age,
      treatmentPlan: req.body.treatmentPlan,
      medicalHistory: req.body.medicalHistory,
      labDetails: req.body.labDetails,
    });
    console.log(data);
    res.json({ message: "data inserted" });
  } catch (error) {
    console.log(error);
  }
});

router.get("/all", authMiddleware, async (req: Request, res: Response) => {
  if (!res.locals.user._id) {
    res.json({ message: "unauthorized" });
  }

  try {
    const data = await patient.where({ doctorId: res.locals.user._id });
    res.json({ data });
  } catch (error) {
    console.log(error);
    res.json({ message: "server error" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const data = await patient.findOne({ _id: req.params.id });
    console.log(data, "lala");
    res.json({ data });
  } catch (error) {
    console.log(error);
    res.json({ message: "server error" });
  }
});

router.patch("/:id", async (req: Request, res: Response) => {
  try {
    const data = await patient.updateOne(
      { _id: req.params.id },
      { name: req.body.name }
    );
    console.log(data, "lala");
    res.json({ data });
  } catch (error) {
    console.log(error);
    res.json({ message: "server error" });
  }
});

export default router;
