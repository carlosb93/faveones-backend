const zodiacService = require('../services/zodiac.service');





exports.get = async (req, res,next) =>  {
    zodiacService.get()
        .then(zodiac => res.json(zodiac))
        .catch(next);
}