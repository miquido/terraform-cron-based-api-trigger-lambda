var qs = require("querystring");

const { ServiceDiscoveryClient, DiscoverInstancesCommand } = require("@aws-sdk/client-servicediscovery");
const client = new ServiceDiscoveryClient();

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

async function requestWithEvent(token) {
  var port = null
  var hostname = process.env.api_hostname
  var http = require("https");

  if (process.env.use_cloudmap === "true") {
    response = await getHostFromCloudmap();
    hostname = response.host
    port = response.port
    http = require("http");
  }

  var options = {
    "method": process.env.api_method,
    "hostname": hostname,
    "port": port,
    "path": process.env.api_path,
    "headers": {
      "content-type": process.env.api_content_type,
      "cache-control": "no-cache"
    }
  };

  if (process.env.auth_mode !== "NONE") {
    options.headers['Authorization'] = token;
  }

  var req = http.request(options, function(res) {
    var chunks = [];

    res.on("data", function(chunk) {
      chunks.push(chunk);
    });

    res.on("end", function() {
      var body = Buffer.concat(chunks);
      console.log("API response: " + body.toString());
      console.log(process.env.response_handler_lambda);
      if (process.env.response_handler_lambda != null) {
        console.log("go");
        const { Lambda } = require("@aws-sdk/client-lambda");
        const lambda = new Lambda();
        const payload = JSON.stringify({
          statusCode: res.statusCode,
          body: body.toString()
        });
        lambda.invoke({
          FunctionName: process.env.response_handler_lambda,
          Payload: payload
        }, function (err, data) {
          if (err) {
            console.log("Error invoking response handler lambda:", err);
          } else {
            console.log("Response handler lambda invoked:", data);
          }
        });
      }
    });
    if (process.env.response_handler_lambda == null && (res.statusCode < 200 || res.statusCode >= 300)) {
      throw new Error("Request failed with status code: " + res.statusCode);
    }

  });

  req.write(process.env.api_request);
  req.end();
}

async function getHostFromCloudmap() {
  const input = {
    NamespaceName: process.env.cloudmap_namespace,
    ServiceName: process.env.api_hostname,
  };
  const command = new DiscoverInstancesCommand(input);
  const response = await client.send(command);

  var attributes = response["Instances"][0]["Attributes"];
  host = attributes["AWS_INSTANCE_IPV4"];
  port = attributes["AWS_INSTANCE_PORT"];

  return {
    "port": port,
    "host": host,
  }
}

