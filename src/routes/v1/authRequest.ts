import { Request, Response, Router } from "express";
import { authMiddleware } from "../../middleware/auth";
import authrequest from "../../db/schemas/authrequest";

const router = Router();

router.post("/create", authMiddleware, async (req: Request, res: Response) => {
  if (!res.locals.user._id) {
    res.json({ message: "unauthorized" });
  }
  try {
    const data = await authrequest.create({
      patientID: req.body.patientID,
      timestamp: req.body.timestamp,
      treatmentDetails: req.body.treatmentDetails,
      status: req.body.status,
      treatmentType: req.body.treatmentType,
      insurancePlan: req.body.insurancePlan,
      diagnosisCode: req.body.diagnosisCode,
      doctorId: res.locals.user._id,
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
    const data = authrequest
      .where({ doctorId: res.locals.user._id })
      .populate({ path: "patientID" }) // key to populate
      .then((user) => {
        console.log(user);
        res.json(user);
      });
  } catch (error) {
    console.log(error);
    res.json({ message: "server error" });
  }
});

export default router;
