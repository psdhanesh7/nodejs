module.exports = {

    authenticatedOnly : (req, res, next) => {
        if(req.isAuthenticated()) return next();
        res.redirect('/auth/login');
    },

    unauthenticatedOnly: (req, res, next) => {
        if(!req.isAuthenticated()) return next();
        res.redirect('/dashboard');
    }
}