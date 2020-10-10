const  api_key = process.env.API_KEY;


module.exports = clientApiKeyValidation;


function clientApiKeyValidation() {
    return [

        async (req, res, next) => {
        let clientApiKey = req.get('api_key');
    
        if (!clientApiKey) {
            return res.status(400).send({
                status: false,
                response: "Missing Api Key"
            })
        }

        try {
            
            if (clientApiKey == api_key) {
                next();
            }
        } catch (e) {
            console.log('%%%%%%%% error :', e);
            return res.status(400).send({
                status: false,
                response: "Invalid Api Key"
            })
         }
        }
    ]
}