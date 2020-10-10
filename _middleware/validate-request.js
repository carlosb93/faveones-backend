module.exports = validateRequest;

function validateRequest(req, next, schema) {
    const options = {
        abortEarly: false,  // -Todos los errores incluidos
        allowUnknown: true, // -Ignorando propiedades desconocidas
        stripUnknown: true  // -Removiendo propiedades desconocidas
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
        next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    } else {
        req.body = value;
        next();
    }
}