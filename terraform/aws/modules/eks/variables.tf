variable "cluster_name" {
  description = "EKS cluster name"
  type        = string
  default     = "demo-eks"
}

variable "cluster_role_arn" {
  description = "IAM role ARN for EKS cluster"
  type        = string
}

variable "subnet_ids" {
  description = "List of subnet IDs for EKS"
  type        = list(string)
}
