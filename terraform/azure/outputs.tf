output "vnet_id" {
  value = module.network.vnet_id
}
output "aks_cluster_name" {
  value = module.aks.cluster_name
}
output "appgw_public_ip" {
  value = module.appgw.public_ip
}
