variable "storage_account_name" {
  description = "Storage account name"
  type        = string
  default     = "demostorageacct"
}

variable "resource_group_name" {
  description = "Resource group name"
  type        = string
}

variable "location" {
  description = "Azure region"
  type        = string
}

variable "share_name" {
  description = "Azure File Share name"
  type        = string
  default     = "demofileshare"
}
