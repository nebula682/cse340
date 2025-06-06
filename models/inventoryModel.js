const pool = require("../database/index.js")










const db = require('../database')

async function getClassifications() {
  return db.query("SELECT * FROM public.classification ORDER BY classification_name")
}

async function getInventoryByClassificationId(classification_id) {
  const data = await db.query(
    `SELECT * FROM public.inventory AS i 
     JOIN public.classification AS c 
     ON i.classification_id = c.classification_id 
     WHERE i.classification_id = $1`,
    [classification_id]
  )
  return data.rows
}

async function getVehicleById(id) {
  const result = await db.query('SELECT * FROM inventory WHERE inv_id = $1', [id])
  return result.rows[0]
}

async function addInventory(vehicleData) {
  const sql = `
    INSERT INTO inventory (
      inv_make, inv_model, inv_year, inv_description,
      inv_image, inv_thumbnail, inv_price,
      inv_miles, inv_color, classification_id
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
    RETURNING *;
  `
  const values = [
    vehicleData.inv_make,
    vehicleData.inv_model,
    vehicleData.inv_year,
    vehicleData.inv_description,
    vehicleData.inv_image,
    vehicleData.inv_thumbnail,
    vehicleData.inv_price,
    vehicleData.inv_miles,
    vehicleData.inv_color,
    vehicleData.classification_id
  ]
  return db.query(sql, values)
}

module.exports = {
  getClassifications,
  getInventoryByClassificationId,
  getVehicleById,
  addInventory
}





















module.exports = 
  {getClassifications, getInventoryByClassificationId,getVehicleById,addInventory };
 