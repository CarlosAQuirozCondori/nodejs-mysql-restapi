import express from 'express'
//db.js contiene las credenciales de mysql
//import {connection} from './db.js'
import employeesRoutes from './routes/employees.routes.js'
import indexRoutes from './routes/index.routes.js'

const app = express()

//formatea a json
app.use(express.json())

//se crea un objeto que importa desde las rutas dentro de /routes/
app.use(indexRoutes)
//llamamos a todas las rutas desde routes/emplo...
app.use(employeesRoutes)


app.listen(3000)
console.log('Server running on port 3000')