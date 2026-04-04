terraform {
  required_version = ">= 1.0.0"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = ">= 3.0"
    }
  }
}

provider "azurerm" {
  features {}
  location = var.location
}

module "network" {
  source = "./modules/network"
  vnet_cidr = var.vnet_cidr
  location = var.location
  resource_group_name = var.resource_group_name
}

module "aks" {
  source = "./modules/aks"
  vnet_id = module.network.vnet_id
  subnet_id = module.network.private_subnet_id
  location = var.location
  resource_group_name = var.resource_group_name
}

module "appgw" {
  source = "./modules/appgw"
  vnet_id = module.network.vnet_id
  subnet_id = module.network.public_subnet_id
  location = var.location
  resource_group_name = var.resource_group_name
}

module "azurefiles" {
  source = "./modules/azurefiles"
  location = var.location
  resource_group_name = var.resource_group_name
}
