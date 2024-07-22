import { Router, Request, Response } from "express";
const router = Router();

//IMPORTANDO LOS CONTROLADORES
import { indexControllers } from "../controllers/index.controllers";



router.get('/', indexControllers.getClients)
router.get('/:id', indexControllers.getClient)
router.get('/:id/examenes', indexControllers.getClientExamenes)
router.get('/:id/dosis', indexControllers.getClientDosis)
router.get('/:id/antecedentes', indexControllers.getClientAntecedentes)
router.get('/pdf/:id', indexControllers.crearPdf)

router.post('/', indexControllers.createClient)
router.post('/:id', indexControllers.createBio)
router.post('/:id/examenes', indexControllers.createExamenes)
router.post('/:id/dosis', indexControllers.createDosis)
router.post('/:id/antecedentes', indexControllers.createAntecedentes)




export default router;