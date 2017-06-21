module.exports = {
  isAuthenticated: isAuthenticated
}

function isAuthenticated(req,res,next){
  if(req.isAuthenticated())
     return next()
  return res.redirect('/login');
}
