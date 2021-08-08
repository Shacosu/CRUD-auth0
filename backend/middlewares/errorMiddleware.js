
const notFound = (err, req, res, next) => {
    const error = new Error(`Usuario ya ingresado o no se ha encontrado`);
    res.status(404);
    next(error);
}

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message
    })
}


export {
    notFound,
    errorHandler
}