var https = require("https");
var qs = require("querystring");


exports.handler = (event, context, callback) => {
  switch (process.env.auth_mode) {
    case "NONE":
      requestWithEvent(null);
      break;
    case "PROVIDED":
      requestWithEvent(process.env.auth_token);
      break;
    case "REQUEST":
      requestForToken(requestWithEvent);
      break;
    default:
      console.log("Invalid auth_mode. Must be NONE, PROVIDED or REQUEST.");
  }
};

function requestForToken(onSuccess) {

  var options = {
    "method": process.env.auth_method,
    "hostname": process.env.auth_hostname,
    "port": null,
    "path": process.env.auth_path,
    "headers": {
      "content-type": process.env.auth_content_type,
      "cache-control": "no-cache"
    }
  };

  var req = https.request(options, function(res) {
    var chunks = [];

    res.on("data", function(chunk) {
      chunks.push(chunk);
    });

    res.on("end", function() {
      var body = Buffer.concat(chunks);
      console.log("Auth response: " + body.toString());
      onSuccess(JSON.parse(body).access_token)
    });
  });

  req.write(process.env.auth_request);
  req.end();
}

function requestWithEvent(token) {
  var options = {
    "method": process.env.api_method,
    "hostname": process.env.api_hostname,
    "port": null,
    "path": process.env.api_path,
    "headers": {
      "content-type": process.env.api_content_type,
      "cache-control": "no-cache"
    }
  };

  if (process.env.auth_mode !== "NONE") {
    options.headers['Authorization'] = token;
  }

  var req = https.request(options, function(res) {
    var chunks = [];

    res.on("data", function(chunk) {
      chunks.push(chunk);
    });

    res.on("end", function() {
      var body = Buffer.concat(chunks);
      console.log("API response: " + body.toString());
    });
  });

  req.write(process.env.api_request);
  req.end();
}
