variable "vnet_cidr" {
  description = "CIDR block for the VNet"
  type        = string
  default     = "10.1.0.0/16"
}

variable "location" {
  description = "Azure region"
  type        = string
}

variable "resource_group_name" {
  description = "Resource group name"
  type        = string
}
