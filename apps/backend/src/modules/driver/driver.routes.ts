import { validateZod } from "@/middlewares/ValidateRequest";
import { Router } from "express";

import { CreateDriverSchema, UpdateDriverSchema } from "./driver.schema";

const router: Router = Router();

router.post("/", validateZod(CreateDriverSchema));
// router.get("/:id", getDriverById);
// router.put("/:id", validate(UpdateDriverSchema), updateDriver);
// router.delete("/:id", deleteDriver);

export default router;
