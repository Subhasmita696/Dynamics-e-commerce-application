resource "azurerm_application_gateway" "main" {
  name                = var.appgw_name
  location            = var.location
  resource_group_name = var.resource_group_name
  sku {
    name     = "WAF_v2"
    tier     = "WAF_v2"
    capacity = 2
  }
  gateway_ip_configuration {
    name      = "appgw-ip-config"
    subnet_id = var.subnet_id
  }
  frontend_port {
    name = "frontendPort"
    port = 80
  }
  frontend_ip_configuration {
    name                 = "frontendIP"
    public_ip_address_id = var.public_ip_id
  }
  backend_address_pool {
    name  = "backendPool"
    fqdns = []
  }
  backend_http_settings {
    name                  = "httpSettings"
    cookie_based_affinity = "Disabled"
    port                  = 80
    protocol              = "Http"
  }
  http_listener {
    name                           = "httpListener"
    frontend_ip_configuration_name  = "frontendIP"
    frontend_port_name              = "frontendPort"
    protocol                       = "Http"
  }
  request_routing_rule {
    name                       = "rule1"
    rule_type                  = "Basic"
    http_listener_name         = "httpListener"
    backend_address_pool_name  = "backendPool"
    backend_http_settings_name = "httpSettings"
  }
}

output "public_ip" {
  value = var.public_ip_id
}
