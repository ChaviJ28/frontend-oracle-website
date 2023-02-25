module.exports = async (url, data) => {
    var request = require('request');
    require('dotenv').config();
    return new Promise(function (resolve, reject) {
        var request = require('request');
        var body = {
            auth: {
                app_token: process.env.APP_TOKEN,
                user_token: process.env.USER_TOKEN
            },
            data: data
        }
        var options = {
            method: 'POST',
            url: process.env.API_URL + url,
            headers: {
            },
            body: JSON.stringify(body)
        };
        request(options, async (error, response) => {
            if (error) {
                console.log(error);
                reject(error);
            };
            console.log(response.body);
            resolve(JSON.parse(response.body));
        });

        // request('https://bitskins.com/api/v1/get_account_balance/?api_key=' + api + '&code=' + code, function (error, response, body) {
        //     // in addition to parsing the value, deal with possible errors
        //     if (err) return reject(err);
        //     try {
        //         // JSON.parse() can throw an exception if not valid JSON
        //         resolve(JSON.parse(body).data.available_balance);
        //     } catch (e) {
        //         reject(e);
        //     }
        // });
    });

}