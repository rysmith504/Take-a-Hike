
const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendstatus(401)
}

module.exports = { isLoggedIn }