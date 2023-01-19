module.exports.newtemplate = async (req, res) => {
    try {
        res.render('form/viewtemplate', {})
    } catch (err) {
        console.log(err)
    }
}

module.exports.viewform = async (req, res) => {
    try {
        var id = req.params.id;
        console.log(id);
        res.render('form/viewform', {})
    } catch (err) {
        console.log(err)
    }

}
