resource "azurerm_virtual_network" "main" {
  name                = "main-vnet"
  address_space       = [var.vnet_cidr]
  location            = var.location
  resource_group_name = var.resource_group_name
}

resource "azurerm_subnet" "public" {
  name                 = "public-subnet"
  resource_group_name  = var.resource_group_name
  virtual_network_name = azurerm_virtual_network.main.name
  address_prefixes     = [cidrsubnet(var.vnet_cidr, 8, 0)]
}

resource "azurerm_subnet" "private" {
  name                 = "private-subnet"
  resource_group_name  = var.resource_group_name
  virtual_network_name = azurerm_virtual_network.main.name
  address_prefixes     = [cidrsubnet(var.vnet_cidr, 8, 1)]
}

output "vnet_id" {
  value = azurerm_virtual_network.main.id
}
output "public_subnet_id" {
  value = azurerm_subnet.public.id
}
output "private_subnet_id" {
  value = azurerm_subnet.private.id
}
