const checkNotAuth = (req,res,next) => {
    if(req.isAuthenticated()){
        res.redirect('/')
    }

    next();
}

module.exports = checkNotAuth;