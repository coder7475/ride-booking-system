import { checkAuth } from "@/middlewares/CheckAuth";
import { validateZod } from "@/middlewares/ValidateRequest";
import { Role } from "@/types/types";
import { Router } from "express";

import { RidesController } from "./ride.controller";
import { CreateRideSchema, UpdateRideSchema } from "./ride.schema";

const RidesRouter: Router = Router();

// Estimate fare of a ride
RidesRouter.get("/fare", RidesController.estimateFare);

// List ride history for current user
RidesRouter.get(
  "/me",
  checkAuth(...Object.values(Role)),
  RidesController.listMyRides,
);

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

// Driver accepts ride
RidesRouter.patch(
  "/:id/accept",
  checkAuth(Role.DRIVER),
  RidesController.handleAcceptRide,
);

// Update ride status (PICKED_UP) - only driver
RidesRouter.patch(
  "/:id/picked",
  checkAuth(Role.DRIVER),
  RidesController.handlePickedUp,
);

// Update ride status (IN_TRANSIT) - only driver
RidesRouter.patch(
  "/:id/transit",
  checkAuth(Role.DRIVER),
  RidesController.handleInTransit,
);

// Update ride status (COMPLETED) - only driver
RidesRouter.patch(
  "/:id/complete",
  checkAuth(Role.DRIVER),
  RidesController.handleCompleted,
);

export default RidesRouter;
