
import { Router, Request, Response } from "express";
import { BranchRepository } from "./branches.repository";
import { BranchService } from "./branches.service";
import { BranchController } from "./branches.controller";
import { validateZod } from "../../middleware/validate";
import { getBranchByIdSchema, getBranchesSchema } from "./branches.schema";

const router = Router();

const repo = new BranchRepository();
const service = new BranchService(repo);
const controller = new BranchController(service);

router.get('/', validateZod(getBranchesSchema), controller.getBranches)
router.get('/:id', validateZod(getBranchByIdSchema, "params"), controller.getBranchById)

export default router