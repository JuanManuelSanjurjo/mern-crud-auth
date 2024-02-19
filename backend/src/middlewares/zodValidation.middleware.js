export const validateSchema = (schema) => (req, res, next) => { 
    try{   
        schema.parse(req.body)   
        next() 
    } catch(err){
        return res.status(400).json( err.errors.map(err => err.message)) 


    } 
}

// con forma tradicional de funcion
export function validateSchemaTraditional(schema) {
    return function(req, res, next) {
        try {
            schema.parse(req.body);
            next();
        } catch (err) {
            return res.status(400).json({ err });
        }
    }
}