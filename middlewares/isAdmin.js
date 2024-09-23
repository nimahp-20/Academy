module.exports = async (req, res, next) => {
    const isAdmin = req.user.role === 'ADMIN'

    if (isAdmin) {
        return next()
    }

    return res.status(403).json({
        message:"You can't access to this route!"
    })

}