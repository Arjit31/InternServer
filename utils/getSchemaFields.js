// Extract all fields ending with "Id" except "userId" from the schema
function getSchemaFields(schema) {
    const schemaFields = Object.keys(VendorGeneralDetails.schema.paths).filter(
        (field) => field.endsWith('Id') && field !== 'userId'
      );
      return schemaFields;
}

module.exports = getSchemaFields;