module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    switch (true) {
        case typeof err === 'string':
            // errores de aplicacion personalizados
            const is404 = err.toLowerCase().endsWith('Not Found !!!');
            const statusCode = is404 ? 404 : 400;
            return res.status(statusCode).json({ message: err });
        case err.name === 'UnauthorizedError':
            // Error de autenticacion en JWT
            return res.status(401).json({ message: 'UNAUTHORIZED' }); // ToDo cambiar texto de mensaje
        default:
            return res.status(500).json({ message: err.message });
    }
}