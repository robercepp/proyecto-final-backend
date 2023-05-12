function errorChecker(req, res, resultado) {
    if(res.statusCode !== 200) {
        res.status(res.statusCode).render('error.ejs', {status: res.statusCode, error: res.statusMessage })
    } else {
        return res.send(resultado)
    }
}

module.exports = {errorChecker}