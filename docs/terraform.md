<!-- markdownlint-disable -->
## Requirements

| Name | Version |
|------|---------|
| <a name="requirement_terraform"></a> [terraform](#requirement\_terraform) | >= 0.13 |

## Providers

| Name | Version |
|------|---------|
| <a name="provider_archive"></a> [archive](#provider\_archive) | n/a |
| <a name="provider_aws"></a> [aws](#provider\_aws) | n/a |

## Modules

| Name | Source | Version |
|------|--------|---------|
| <a name="module_label"></a> [label](#module\_label) | git::https://github.com/cloudposse/terraform-terraform-label.git | 0.8.0 |

## Resources

| Name | Type |
|------|------|
| [aws_cloudwatch_event_rule.default](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_event_rule) | resource |
| [aws_cloudwatch_event_target.default](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_event_target) | resource |
| [aws_cloudwatch_log_group.default](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_group) | resource |
| [aws_iam_role.default](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_role) | resource |
| [aws_iam_role_policy.default](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_role_policy) | resource |
| [aws_iam_role_policy_attachment.vpc-execution-role-policy-attach](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_role_policy_attachment) | resource |
| [aws_lambda_alias.default](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_alias) | resource |
| [aws_lambda_function.default](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function) | resource |
| [aws_lambda_permission.default](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_permission) | resource |
| [archive_file.lambda](https://registry.terraform.io/providers/hashicorp/archive/latest/docs/data-sources/file) | data source |
| [aws_iam_policy.AWSLambdaVPCAccessExecutionRole](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/iam_policy) | data source |
| [aws_iam_policy_document.assume_role](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/iam_policy_document) | data source |
| [aws_iam_policy_document.default](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/iam_policy_document) | data source |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_api_content_type"></a> [api\_content\_type](#input\_api\_content\_type) | Value of Lambda ENV variable `api_content_type` | `string` | n/a | yes |
| <a name="input_api_hostname"></a> [api\_hostname](#input\_api\_hostname) | Value of Lambda ENV variable `api_hostname` | `string` | n/a | yes |
| <a name="input_api_method"></a> [api\_method](#input\_api\_method) | Value of Lambda ENV variable `api_method` | `string` | n/a | yes |
| <a name="input_api_path"></a> [api\_path](#input\_api\_path) | Value of Lambda ENV variable `api_path` | `string` | n/a | yes |
| <a name="input_api_request"></a> [api\_request](#input\_api\_request) | Value of Lambda ENV variable `api_request` | `string` | n/a | yes |
| <a name="input_attributes"></a> [attributes](#input\_attributes) | Additional attributes (e.g. `1`) | `list(string)` | `[]` | no |
| <a name="input_auth_content_type"></a> [auth\_content\_type](#input\_auth\_content\_type) | Value of Lambda ENV variable `auth_content_type` | `string` | `"application/x-www-form-urlencoded"` | no |
| <a name="input_auth_hostname"></a> [auth\_hostname](#input\_auth\_hostname) | Value of Lambda ENV variable `auth_hostname` | `string` | `""` | no |
| <a name="input_auth_method"></a> [auth\_method](#input\_auth\_method) | Value of Lambda ENV variable `auth_method` | `string` | `"POST"` | no |
| <a name="input_auth_mode"></a> [auth\_mode](#input\_auth\_mode) | Method of populating Authorization header. One of NONE, PROVIDED (uses auth\_token), REQUEST (uses remaining auth\_* envs). | `string` | n/a | yes |
| <a name="input_auth_path"></a> [auth\_path](#input\_auth\_path) | Value of Lambda ENV variable `auth_path` | `string` | `""` | no |
| <a name="input_auth_request"></a> [auth\_request](#input\_auth\_request) | Value of Lambda ENV variable `auth_request` | `string` | `""` | no |
| <a name="input_auth_token"></a> [auth\_token](#input\_auth\_token) | Authorization token to be used with PROVIDED auth\_mode. It's required to provide token type together with value e.g `Basic ZnJlZDpmcmVk`. | `string` | `""` | no |
| <a name="input_delimiter"></a> [delimiter](#input\_delimiter) | Delimiter to be used between `namespace`, `stage`, `name` and `attributes` | `string` | `"-"` | no |
| <a name="input_log_retention"></a> [log\_retention](#input\_log\_retention) | Specifies the number of days you want to retain log events in the specified log group. | `string` | `"7"` | no |
| <a name="input_name"></a> [name](#input\_name) | Solution name, e.g. 'app' or 'cluster' | `string` | `"app"` | no |
| <a name="input_namespace"></a> [namespace](#input\_namespace) | Namespace, which could be your organization name, e.g. 'eg' or 'cp' | `string` | n/a | yes |
| <a name="input_schedule_expression"></a> [schedule\_expression](#input\_schedule\_expression) | The scheduling expression. For example, cron(0 20 * * ? *) or rate(5 minutes). | `string` | `"cron(0 1 1/1 * ? *)"` | no |
| <a name="input_stage"></a> [stage](#input\_stage) | Stage, e.g. 'prod', 'staging', 'dev', or 'test' | `string` | n/a | yes |
| <a name="input_tags"></a> [tags](#input\_tags) | Additional tags (e.g. `map('BusinessUnit','XYZ')` | `map(string)` | `{}` | no |
| <a name="input_vpc_config"></a> [vpc\_config](#input\_vpc\_config) | Specify a list of security groups and subnets in the VPC to use in lambda configuration | <pre>object({<br>    security_group_ids = list(string)<br>    subnet_ids         = list(string)<br>  })</pre> | <pre>{<br>  "security_group_ids": [],<br>  "subnet_ids": []<br>}</pre> | no |
| <a name="input_vpc_mode_enable"></a> [vpc\_mode\_enable](#input\_vpc\_mode\_enable) | Set to true to enable usage of lambda in VPC | `bool` | `false` | no |

## Outputs

No outputs.
<!-- markdownlint-restore -->
