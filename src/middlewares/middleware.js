
const validateId = (paramName) => {
    return (req, res, next) => {
        const id = req.params[paramName];

        const uuidRegex =
            /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

        if (!id || !uuidRegex.test(id)) {
            return res.redirect('/?error='+encodeURIComponent(`El identificador (${paramName}) no es valido`))
        }

        next();
    };
};

const validateProduct = (req, res, next) => {
    const { title, description, price, thumbnails, code, stock, category } = req.body;
    const fileUploaded = !!req.file;

    if (
        title === undefined ||
        description === undefined ||
        price === undefined ||
        code === undefined ||
        stock === undefined ||
        category === undefined ||
        (!fileUploaded && thumbnails === undefined)
    ) {
        return res.redirect('/?error='+encodeURIComponent('Todos los campos son obligatorios'));
    }

    const priceNumber = Number(price);
    if (!Number.isFinite(priceNumber) || priceNumber <= 0) {
        return res.redirect('/?error='+encodeURIComponent('El precio debe ser un numero positivo'));
    }

    const stockNumber = Number(stock);
    if (!Number.isFinite(stockNumber) || stockNumber < 0) {
        return res.redirect('/?error='+encodeURIComponent('El stock debe ser un numero positivo'));
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
        return res.redirect('/?error=' + encodeURIComponent('Al menos un campo debe ser proporcionado para la actualización'));
    };

    if(price !== undefined && price !== '') {
        const priceNumber = Number(price);
        if (!Number.isFinite(priceNumber) || priceNumber <= 0) {
            return res.redirect('/?error=' + encodeURIComponent('El precio debe ser un número positivo'));
        }
        req.body.price = priceNumber; 
    }

    if(stock !== undefined && stock !== '') {
        const stockNumber = Number(stock);
        if (!Number.isFinite(stockNumber) || stockNumber < 0) {
            return res.redirect('/?error=' + encodeURIComponent('El stock no debe ser un numero negativo'))
        }
        req.body.stock = stockNumber;
    }

    next();
};

module.exports = { validateProduct, validateId, validateUpdateProduct };