module.exports = function jsonError(errorArray, res) {
    res.status(200);

    res.json({
        success: false,
        error: errorArray
    });
}