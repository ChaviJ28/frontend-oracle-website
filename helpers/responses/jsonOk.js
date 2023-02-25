module.exports = (params, res) => {
    if (params) {
        if (!params.success_message) {
            params.success_message = "Success";
        }

        if (params.data) {
            res.json({
                success: true,
                success_message: params.success_message,
                data: params.data
            });
        } else {
            if(isNaN(params.data)) {
                res.json({
                    success: true,
                    success_message: params.success_message
                });
            } else {
                res.json({
                    success: true,
                    success_message: params.success_message,
                    data: params.data
                });
            }
        }
    } else {
        res.json({
            success: true
        });
    }

}