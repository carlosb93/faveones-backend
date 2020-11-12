const auth = require('./auth');
const user = require('./user');
const post = require('./post');
const profile = require('./profile');
const zodiac = require('./zodiac');
const comment = require('./comment');
const comments = require('./comments');
const relationship = require('./relationship');
const authorize = require('_middleware/authorize')
const clientApiKeyValidation = require('_middleware/validationApiKey')


module.exports = app => {
    app.get('/', clientApiKeyValidation(), (req, res) => {
        res.status(200).send({ message: "Welcome to " + process.env.APP_NAME + "."});
    });

    app.use('/api/auth', clientApiKeyValidation(), auth);
    app.use('/api/post', clientApiKeyValidation(),post);
    app.use('/api/user', clientApiKeyValidation(), authorize(), user);
    app.use('/api/profile', clientApiKeyValidation(), authorize(), profile);
    app.use('/api/zodiac', clientApiKeyValidation(), zodiac);
    app.use('/api/comment', clientApiKeyValidation(), comment);
    app.use('/api/comments', clientApiKeyValidation(), comments);
    app.use('/api/relationship', clientApiKeyValidation(), relationship);
};

