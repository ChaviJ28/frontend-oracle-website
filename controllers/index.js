module.exports.home = async (req, res) => {
    try {
        //API CALL
        res.render('homepage', { blogs: [], banner:[] })
    } catch (err) {
        console.log(err)
    }
}

module.exports.about = async (req, res) => {
    try {
        res.render('aboutus')
    } catch (err) {
        console.log(err)
    }

}

module.exports.privacy = async (req, res) => {
    try {
        res.render('privacy')
    } catch (err) {
        console.log(err)
    }

}

module.exports.member = (req, res) => {
    res.render('join');
}

