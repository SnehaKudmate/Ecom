exports.isAuth = (req, res, done) => {
    if(req.user){
        console.log("right")
        done()
      }else{
        console.log("wrong")
    res.send(401)
      }
  };
  exports.sanitizeUser = (user) => {
    return { id: user.id, role: user.role };
  };  