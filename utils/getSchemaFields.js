// Extract all fields ending with "Id" except "userId" from the schema
function getSchemaFields(givenSchema) {
  const schemaFields = Object.keys(givenSchema.schema.paths).filter(
    (field) => field.endsWith('Id') && field !== 'userId'
  );
  return schemaFields;
}

module.exports = getSchemaFields;