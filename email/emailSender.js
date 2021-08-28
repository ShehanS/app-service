const http = require("http");
module.exports.sendMail = async function (data, path) {
    var options = {
        host: process.env.EMAIL_SERVICE,
        path: `/${path}`,
        port: process.env.EMAIL_SERVICE_PORT,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length,
            'Access-Control-Allow-Origin': '*'
        }
    };
    const mailReq = http.request(options, res => {
        console.log('EMail Sender  : ', `statusCode: ${res.statusCode}`)
        res.on('data', d => {
            process.stdout.write(d)
        })
    });
    mailReq.on('error', error => {
        console.error("EMail Sender : ", error)
    });
    mailReq.write(data)
    mailReq.end();
}