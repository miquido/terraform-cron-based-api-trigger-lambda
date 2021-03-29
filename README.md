
You can define an endpoint and credentials for which a given request will be made with a cron schedule.

Use sample:
```
module "jazzed-mailchimp-sync-lambda" {
  source              = "git::ssh://git@gitlab.com/miquido/terraform/terraform-cron-based-api-trigger-lambda"
  name                = "mailchimp-sync"
  namespace           = var.project
  stage               = var.environment
  tags                = var.tags

  schedule_expression = "cron(0 1 1/1 * ? *)"

  auth_hostname       = local.auth_domain
  auth_path           = "/auth/realms/jazzed/protocol/openid-connect/token"
  auth_method         = "POST"
  auth_content_type   = "application/x-www-form-urlencoded"
  auth_request        = "client_id=${var.mailchimp_client_id}&grant_type=client_credentials&client_secret=${var.mailchimp_client_secret}"

  api_hostname        = local.api_domain
  api_path            = "/api/graphql"
  api_method          = "POST"
  api_content_type    = "application/graphql"
  api_request         = "mutation test { mailchimp { synchronise } }"
}
```
