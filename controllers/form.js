var apiUtility = require('../helpers/apiUtility');
var jsonOk = require('../helpers/responses/jsonOk');
var jsonError = require('../helpers/responses/jsonError');

module.exports.newtemplate = async (req, res) => {
    try {
        res.render('form/viewtemplate', {})
    } catch (err) {
        console.log(err)
    }
}

module.exports.viewForm = async (req, res) => {
    try {
        // 63c841833843ff4241ef7078
        var url = req.params.url,
            formResponse = await apiUtility("form/list", {
                search_criteria: {
                    custom_url: url
                }
            }),
            formData = {};
        if (formResponse && formResponse.data && formResponse.data[0]) {
            formData = formResponse.data[0];
            console.log(typeof formData)
            formData["app_url"] = process.env.APP_URL
            console.log(formData)
            
            if (formData.status == "active") {
                res.render('form/viewform', formData);
            } else {
                res.render('form/viewform', {
                    id: "closed",
                    title: formData.title,
                    status: formData.status,
                    message: "Form Unavailable",
                    app_url: "process.env.APP_URL"
                })
            }
        } else {
            res.render('form/viewform', {
                id: "unexistant",
                title: "ERROR 404",
                status: "404",
                message: "Form Not Found",
                app_url: "process.env.APP_URL"
            })
        }
    } catch (err) {
        console.log(err)
    }

}

module.exports.submitForm = async (req, res) => {
    try {
        var IP = require('ip'),
            submitFormResponse = await apiUtility("response/create", {
                ip: IP.address(),
                form: req.body.form_id,
                form_fields: req.body.response_array
            });
        if (submitFormResponse && submitFormResponse.success && submitFormResponse.success == true) {
            jsonOk({
                data: submitFormResponse.data[0]
            }, res);
        } else {
            jsonError([submitFormResponse.error], res);
        }

    } catch (err) {
        console.log(err)
        jsonError(["submitForm Error"], res);
    }
}