const classificationModel = require('../models/classificationModel')

/**
 * Builds a <select> dropdown of classification options.
 */
async function buildClassificationList(selectedId = null) {
  try {
    const data = await classificationModel.getAllClassifications()

    let list = '<select name="classification_id" id="classification_id" required>'
    list += '<option value="">Choose a Classification</option>'

    data.rows.forEach((row) => {
      const selected = row.classification_id === parseInt(selectedId) ? 'selected' : ''
      //list += `<option value="${row.classification_id}" ${selected}>${row.name}</option>`//

      list += `<option value="${row.classification_id}" ${selected}>${row.classification_name}</option>`
    })

    list += '</select>'
    return list
  } catch (error) {
    console.error('Error building classification list:', error)
    throw error
  }
}

module.exports = buildClassificationList