provider "aws" {
  region = "us-east-1"
}

module "test" {
  source    = "../../"
  name      = "mailchimp-sync"
  stage     = "test"
  namespace = "test"

  schedule_expression = "cron(0 1 1/1 * ? *)"

  auth_mode         = "REQUEST"
  auth_hostname     = "auth.example.com"
  auth_path         = "/auth/realms/jazzed/protocol/openid-connect/token"
  auth_method       = "POST"
  auth_content_type = "application/x-www-form-urlencoded"
  auth_request      = "client_id=example_id&grant_type=client_credentials&client_secret=example_secret"

  api_hostname     = "api.example.com"
  api_path         = "/api/graphql"
  api_method       = "POST"
  api_content_type = "application/graphql"
  api_request      = "mutation test { mailchimp { synchronise } }"
}
