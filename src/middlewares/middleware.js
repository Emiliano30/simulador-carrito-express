


const validateId = (paramName) => {
    return (req, res, next) => {
        const id = req.params[paramName];

        const uuidRegex =
            /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

        if (!id || !uuidRegex.test(id)) {
            return res.status(400).json({
                error: `${paramName} inválido`
            });
        }

        next();
    };
};

const validateProduct = (req, res, next) => {
    const { title, description, price, thumbnails, code, stock, category } = req.body;

    if (
        title === undefined ||
        description === undefined || 
        price === undefined || 
        code === undefined || 
        stock === undefined ||
        thumbnails === undefined ||
        category === undefined
    ) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    if (typeof price !== 'number' || price <= 0) {
        return res.status(400).json({ error: 'El precio debe ser un número positivo' });
    }

    if (typeof stock !== 'number' || stock < 0) {
        return res.status(400).json({ error: 'El stock no debe ser un número negativo' });
    }

    next();
};


const validateUpdateProduct = (req, res, next) => {
    const { title, description, price, thumbnails, code, stock, category } = req.body;
    if (
        title === undefined &&
        description === undefined &&
        price === undefined && 
        thumbnails === undefined && 
        code === undefined && 
        stock === undefined &&
        category === undefined
    ) {
        return res.status(400).json({ error: 'Al menos un campo debe ser proporcionado para actualizar el producto' });
    };

    if(price !== undefined && (typeof price !== 'number' || price <= 0)) {
        return res.status(400).json({ error: 'El precio debe ser un número positivo' });
    }

    if(stock !== undefined && (typeof stock !== 'number' || stock < 0)) {
        return res.status(400).json({ error: 'El stock no debe ser un número negativo' });
    }

    next();
};

module.exports = { validateProduct, validateId, validateUpdateProduct };