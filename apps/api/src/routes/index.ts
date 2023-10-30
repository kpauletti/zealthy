import { Router } from "express";
import * as handlers from "./handlers";
import { jwt } from "./middleware/jwt";

const router: Router = Router();

/* -------------------------------------------------------------------------- */
/*                                 AUTH ROUTES                                */
/* -------------------------------------------------------------------------- */

router.post("/login", handlers.login);
router.post("/signup", handlers.signup);

/* -------------------------------------------------------------------------- */
/*                                 USER ROUTES                                */
/* -------------------------------------------------------------------------- */

router.get("/users", jwt, handlers.getUsers);
router.get("/users/:id", jwt, handlers.getUser);

/* -------------------------------------------------------------------------- */
/*                                TICKET ROUTES                               */
/* -------------------------------------------------------------------------- */

router.get("/tickets", jwt, handlers.getTickets);
router.post("/tickets", jwt, handlers.uploadPhoto, handlers.createTicket);
router.get("/tickets/:ticketId", jwt, handlers.getTicket);
router.put("/tickets/:ticketId", jwt, handlers.updateTicket);

export const MainRouter: Router = router;
