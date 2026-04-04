terraform {
  required_version = ">= 1.0.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 4.0"
    }
  }
}

provider "aws" {
  region = var.region
}

module "network" {
  source = "./modules/network"
  vpc_cidr = var.vpc_cidr
  azs      = var.azs
}

module "eks" {
  source = "./modules/eks"
  vpc_id = module.network.vpc_id
  subnet_ids = module.network.private_subnet_ids
}

module "alb" {
  source = "./modules/alb"
  vpc_id = module.network.vpc_id
  subnet_ids = module.network.public_subnet_ids
}

module "efs" {
  source = "./modules/efs"
  vpc_id = module.network.vpc_id
  subnet_ids = module.network.private_subnet_ids
}
