 const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
    res.json({
        mensaje: "API del Inventario de Taller funcionando correctamente"
    });
});

// ============================
// GET - Obtener todos
// ============================
app.get("/api/repuestos", async (req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT * FROM repuestos ORDER BY id DESC"
        );

        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error al obtener los repuestos"
        });
    }
});

// ============================
// POST - Crear repuesto
// ============================
app.post("/api/repuestos", async (req, res) => {
    try {
        const { nombre, categoria, cantidad, precio, descripcion } = req.body;

        const [result] = await pool.query(
            `INSERT INTO repuestos
            (nombre, categoria, cantidad, precio, descripcion)
            VALUES (?, ?, ?, ?, ?)`,
            [nombre, categoria, cantidad, precio, descripcion]
        );

        res.status(201).json({
            mensaje: "Repuesto creado correctamente",
            id: result.insertId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error al crear el repuesto"
        });
    }
});

// ============================
// PUT - Actualizar repuesto
// ============================
app.put("/api/repuestos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, categoria, cantidad, precio, descripcion } = req.body;

        const [result] = await pool.query(
            `UPDATE repuestos
             SET nombre = ?, categoria = ?, cantidad = ?,
                 precio = ?, descripcion = ?
             WHERE id = ?`,
            [nombre, categoria, cantidad, precio, descripcion, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: "Repuesto no encontrado"
            });
        }

        res.json({
            mensaje: "Repuesto actualizado correctamente"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error al actualizar el repuesto"
        });
    }
});

// ============================
// DELETE - Eliminar repuesto
// ============================
app.delete("/api/repuestos/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.query(
            "DELETE FROM repuestos WHERE id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: "Repuesto no encontrado"
            });
        }

        res.json({
            mensaje: "Repuesto eliminado correctamente"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error al eliminar el repuesto"
        });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});