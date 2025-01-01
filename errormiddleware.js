const errormiddleware = (err, req, res, next) => {    
    const status = err.status || 500;
    const message = err.message || 'internal server error';
    return res.status(status).json({ status, message });
}

module.exports = errormiddleware;