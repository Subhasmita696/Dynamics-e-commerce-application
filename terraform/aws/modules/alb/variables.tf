variable "lb_name" {
  description = "Name of the ALB"
  type        = string
  default     = "demo-alb"
}

variable "subnet_ids" {
  description = "List of subnet IDs for ALB"
  type        = list(string)
}
