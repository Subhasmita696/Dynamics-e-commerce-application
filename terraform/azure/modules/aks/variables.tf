variable "cluster_name" {
  description = "AKS cluster name"
  type        = string
  default     = "demo-aks"
}

variable "location" {
  description = "Azure region"
  type        = string
}

variable "resource_group_name" {
  description = "Resource group name"
  type        = string
}

variable "dns_prefix" {
  description = "DNS prefix for AKS"
  type        = string
  default     = "demoaks"
}

variable "node_count" {
  description = "Number of nodes in the default pool"
  type        = number
  default     = 2
}

variable "vm_size" {
  description = "VM size for nodes"
  type        = string
  default     = "Standard_DS2_v2"
}

variable "subnet_id" {
  description = "Subnet ID for AKS nodes"
  type        = string
}
