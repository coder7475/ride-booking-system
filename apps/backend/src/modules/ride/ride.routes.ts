import { checkAuth } from "@/middlewares/CheckAuth";
import { validateZod } from "@/middlewares/ValidateRequest";
import { Role } from "@/types/types";
import { Router } from "express";

import { RidesController } from "./ride.controller";
import { CreateRideSchema } from "./ride.schema";

const RidesRouter: Router = Router();

// Rider requests a new ride - user request rides
RidesRouter.post(
  "/request",
  validateZod(CreateRideSchema),
  checkAuth(Role.USER),
  RidesController.handleRequestRide,
);

// Cancel ride before pickup - user
RidesRouter.post(
  "/:id/cancel",
  checkAuth(Role.USER),
  RidesController.handleCancelRide,
);

// Get ride details
RidesRouter.get(
  "/:id",
  checkAuth(...Object.values(Role)),
  RidesController.singleRideRequest,
);

// List ride history for current user
RidesRouter.get("/me", checkAuth(Role.USER), RidesController.listMyRides);

// Driver accepts ride
RidesRouter.patch("/:id/accept", checkAuth(Role.DRIVER), (req, res) => {
  // Handler to be implemented
});

// Update ride status (PICKED_UP, IN_TRANSIT, COMPLETED) - only driver
RidesRouter.patch("/:id/picked", checkAuth(Role.DRIVER), (req, res) => {
  // Handler to be implemented
});

// Update ride status (IN_TRANSIT) - only driver
RidesRouter.patch("/:id/transit", checkAuth(Role.DRIVER), (req, res) => {
  // Handler to be implemented
});

// Update ride status (COMPLETED) - only driver
RidesRouter.patch("/:id/complete", checkAuth(Role.DRIVER), (req, res) => {
  // Handler to be implemented
});

export default RidesRouter;
