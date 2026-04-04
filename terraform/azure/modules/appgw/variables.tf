variable "appgw_name" {
  description = "Application Gateway name"
  type        = string
  default     = "demo-appgw"
}

variable "location" {
  description = "Azure region"
  type        = string
}

variable "resource_group_name" {
  description = "Resource group name"
  type        = string
}

variable "subnet_id" {
  description = "Subnet ID for Application Gateway"
  type        = string
}

variable "public_ip_id" {
  description = "Public IP resource ID"
  type        = string
}
