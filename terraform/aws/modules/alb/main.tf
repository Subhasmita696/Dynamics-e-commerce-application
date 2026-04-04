resource "aws_lb" "main" {
  name               = var.lb_name
  internal           = false
  load_balancer_type = "application"
  subnets            = var.subnet_ids
}

output "dns_name" {
  value = aws_lb.main.dns_name
}
