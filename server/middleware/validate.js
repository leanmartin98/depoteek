// Middleware para validar con Zod
export const validate = (schema) => {
    return (req, res, next) => {
        try {
            // validar y parsear los datos
            const validatedData = schema.parse(req.body);

            //Reemplazar req.body con los datos validados y transformados
            req.body = validatedData;

            next();
        } catch (error) {
            // Si hay errores de validación, devolverlos
            if (error.errors) {
                const errors = error.errors.map(err => ({
                    field: err.path.join('.'),
                    message: err.message
                }));

                return res.status(400).json({
                    error: 'Errores de validación',
                    details: errors
                })
            }

            res.status(400).json({ error: 'Error en la validación', details: error.message})
        }
    }
}