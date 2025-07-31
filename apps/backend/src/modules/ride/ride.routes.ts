import { checkAuth } from "@/middlewares/CheckAuth";
import { Role } from "@/types/types";
import { Router } from "express";

import { RidesController } from "./ride.controller";

const RidesRouter: Router = Router();

// Rider requests a new ride - user request rides
RidesRouter.post(
  "/request",
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
RidesRouter.get("/:id", checkAuth(...Object.values(Role)), (req, res) => {
  // Handler to be implemented
});

// List ride history for current user
RidesRouter.get("/me", checkAuth(Role.USER), (req, res) => {
  // Handler to be implemented
});

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
