//const db = require('../data/database');//


const db = require('../database/index');

exports.addClassification = async (classificationName) => {
    const result = await db.query('INSERT INTO classification (classification_name) VALUES ($1)', [classificationName]);
    return result;
};

exports.getAllClassifications = async () => {
  const result = await db.query('SELECT * FROM classification ORDER BY classification_name');
  return result.rows;
};