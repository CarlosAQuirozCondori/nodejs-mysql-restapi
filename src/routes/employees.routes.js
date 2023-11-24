import { Router } from "express";
import {getEmployees, createEmployee, updateEmployee, deleteEmployee, getEmployee} from "../controllers/employees.controller.js"
//import que contiene la variable de conexion
//import  { connection } from '../db.js'

const router = Router()

router.get('/employees', getEmployees)
router.get('/employees/:id', getEmployee)
router.post('/employees', createEmployee)
router.put('/employees',updateEmployee )
router.delete('/employees', deleteEmployee)

export default router