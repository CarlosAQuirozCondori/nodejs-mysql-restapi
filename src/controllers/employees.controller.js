//import que contiene la variable de conexion
import { pool } from "../db.js";

export const getEmployees = async (req, res) => {
  try {
    //throw new error('DB error')
    const [rows] = await pool.query("SELECT * from EMPLOYEE");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [
      id,
    ]);
    if (rows.length === 0)
      return res.status(404).json({
        message: "Employee not found",
      });
    //console.log(rows[0])
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const { name, salary } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO employee (name, salary) VALUES (?, ?)",
      [name, salary]
    );
    res.send({
      id: rows.insertId,
      name,
      salary,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};
export const deleteEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const [rows] = await pool.query("DELETE FROM employee WHERE id = ?", [id]);
    //console.log(rows)
    //res.send('employee deleted')
    if (rows.affectedRows <= 0)
      return res.status(404).json({
        message: "Employee not found",
      });
    res.status(204);
    //no funciona el status 204 sin enviar una respuesta
    res.send("funcionando");
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, salary } = req.body;

    const [result] = await pool.query(
      "UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?",
      [name, salary, id]
    );
    //res.send("actualizando empleados");
    if (result.affectedRows === 0)
      return res.status(404).json({
        message: "Employee not found",
      });

    const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [
      id,
    ]);
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};
