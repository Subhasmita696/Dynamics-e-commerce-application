variable "efs_name" {
  description = "Name for the EFS file system"
  type        = string
  default     = "demo-efs"
}

variable "subnet_ids" {
  description = "List of subnet IDs for EFS mount targets"
  type        = list(string)
}

variable "security_group_ids" {
  description = "List of security group IDs for EFS mount targets"
  type        = list(string)
}
