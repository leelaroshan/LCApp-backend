const getMe = (req, res) => {
    if (req.user) return res.json({ success: true, data: req.user, msg: "I'm still logged in"})
}

module.exports = {
    getMe
}