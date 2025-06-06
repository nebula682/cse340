//const db = require('../data/database');//


const db = require('../database/index');

exports.addClassification = async (classificationName) => {
    const result = await db.query('INSERT INTO classifications (name) VALUES ($1)', [classificationName]);
    return result;
};