variable "namespace" {
  type        = string
  description = "Namespace, which could be your organization name, e.g. 'eg' or 'cp'"
}

variable "stage" {
  type        = string
  description = "Stage, e.g. 'prod', 'staging', 'dev', or 'test'"
}

variable "name" {
  type        = string
  default     = "app"
  description = "Solution name, e.g. 'app' or 'cluster'"
}

variable "delimiter" {
  type        = string
  default     = "-"
  description = "Delimiter to be used between `namespace`, `stage`, `name` and `attributes`"
}

variable "attributes" {
  type        = list(string)
  default     = []
  description = "Additional attributes (e.g. `1`)"
}

variable "tags" {
  type        = map(string)
  default     = {}
  description = "Additional tags (e.g. `map('BusinessUnit','XYZ')`"
}

variable "log_retention" {
  default     = "7"
  description = "Specifies the number of days you want to retain log events in the specified log group."
}

variable "schedule_expression" {
  default     = "cron(0 1 1/1 * ? *)"
  description = "The scheduling expression. For example, cron(0 20 * * ? *) or rate(5 minutes)."
}

variable "auth_mode" {
  type        = string
  description = "Method of populating Authorization header. One of NONE, PROVIDED (uses auth_token), REQUEST (uses remaining auth_* envs)."
}

variable "auth_token" {
  type        = string
  default     = ""
  description = "Authorization token to be used with PROVIDED auth_mode."
}

variable "auth_hostname" {
  type        = string
  default     = ""
  description = "Value of Lambda ENV variable `auth_hostname`"
}

variable "auth_method" {
  type        = string
  default     = "POST"
  description = "Value of Lambda ENV variable `auth_method`"
}

variable "auth_content_type" {
  type        = string
  default     = "application/x-www-form-urlencoded"
  description = "Value of Lambda ENV variable `auth_content_type`"
}

variable "auth_path" {
  type        = string
  default     = ""
  description = "Value of Lambda ENV variable `auth_path`"
}

variable "auth_request" {
  type        = string
  default     = ""
  description = "Value of Lambda ENV variable `auth_request`"
}

variable "api_hostname" {
  type        = string
  description = "Value of Lambda ENV variable `api_hostname`"
}

variable "api_path" {
  type        = string
  description = "Value of Lambda ENV variable `api_path`"
}

variable "api_method" {
  type        = string
  description = "Value of Lambda ENV variable `api_method`"
}

variable "api_content_type" {
  type        = string
  description = "Value of Lambda ENV variable `api_content_type`"
}

variable "api_request" {
  type        = string
  description = "Value of Lambda ENV variable `api_request`"
}
