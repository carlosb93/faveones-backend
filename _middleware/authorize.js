const jwt = require('express-jwt');
const secret =process.env.SECRET;
const db = require('../_helpers/db');

module.exports = authorize;

function authorize() {
    return [
        // Autenticando JWT token y adjunta token decodificado al request como req.user
        jwt({ secret, algorithms: ['HS256'] }),

        // Adjunta user completo al objeto request
        async (req, res, next) => {
            // Obtengo usuario con el id del token 'sub' propiedad (sujeto) 
            const user = await db.User.findByPk(req.user.sub);
            // Verificando que el usuario exista
            if (!user)
                return res.status(401).json({ message: 'UNAUTHORIZED' }); //  ToDo cambiar texto de mensaje 
            // Autorizacion completada
            req.user = user.get();
            next();
        }
    ];
}
