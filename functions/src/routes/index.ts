import { Router } from "express";

import * as students from "./students"

const router: Router = Router();

router.get("/student", students.find)
router.get("/student/:name", students.get)
router.post("/student", students.post)
router.put("/student/:id", students.put)
router.patch("/student/:id", students.patch)
router.delete("/student/:id", students.remove)


export const routes: Router = router;
