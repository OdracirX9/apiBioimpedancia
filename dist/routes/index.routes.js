"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
//IMPORTANDO LOS CONTROLADORES
const index_controllers_1 = require("../controllers/index.controllers");
router.get('/', index_controllers_1.indexControllers.getClients);
router.get('/:id', index_controllers_1.indexControllers.getClient);
router.get('/:id/examenes', index_controllers_1.indexControllers.getClientExamenes);
router.get('/:id/dosis', index_controllers_1.indexControllers.getClientDosis);
router.get('/:id/antecedentes', index_controllers_1.indexControllers.getClientAntecedentes);
router.post('/', index_controllers_1.indexControllers.createClient);
router.post('/:id', index_controllers_1.indexControllers.createBio);
router.post('/:id/examenes', index_controllers_1.indexControllers.createExamenes);
router.post('/:id/dosis', index_controllers_1.indexControllers.createDosis);
router.post('/:id/antecedentes', index_controllers_1.indexControllers.createAntecedentes);
exports.default = router;
