# 🚀 Installation Guide

This guide provides step-by-step instructions to set up the project and all required DevOps tools on AWS and Azure, including infrastructure, Argo CD, Helm, Prometheus, Grafana, SonarQube, Trivy, and OWASP ZAP.

> **Note:** All commands below are compatible with Ubuntu. Use `apt` for package installations and follow the Linux-specific instructions for each tool.

---

## 1. Infrastructure Requirements

### AWS
- Minimum 2 EC2 servers (t3.medium or better):
  - 1 for Kubernetes master/control-plane (can use managed EKS)
  - 1 for worker node (scale as needed)
- RDS MySQL instance (or self-hosted MySQL)
- S3 bucket for artifact storage (optional)

### Azure
- Minimum 2 VMs (Standard_B2s or better) or use AKS:
  - 1 for Kubernetes master/control-plane (or AKS node pool)
  - 1 for worker node (scale as needed)
- Azure Database for MySQL (or self-hosted MySQL)
- Azure Blob Storage (optional)

---

## 2. Prerequisites

- Docker
- kubectl
- Helm
- Argo CD CLI
- Git
- Node.js & npm (for frontend)
- Java 17 & Maven (for backend)

---

## 3. Installation Steps

### 3.1. Clone the Repository
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 3.2. Install & Configure Kubernetes Cluster
- On AWS: Use EKS or kubeadm
- On Azure: Use AKS or kubeadm

### 3.3. Install Argo CD
```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
# Expose Argo CD API server (choose one):
kubectl port-forward svc/argocd-server -n argocd 8080:443
```

### 3.4. Install Helm
```bash
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
helm version
```

### 3.5. Install Prometheus (via Helm)
```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm install prometheus prometheus-community/prometheus --namespace monitoring --create-namespace
```

### 3.6. Install Grafana (via Helm)
```bash
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update
helm install grafana grafana/grafana --namespace monitoring
```

### 3.7. Install SonarQube (via Helm)
```bash
helm repo add oteemocharts https://oteemo.github.io/charts
helm repo update
helm install sonarqube oteemocharts/sonarqube --namespace devops --create-namespace
```

### 3.8. Install Trivy (Security Scanner)
```bash
brew install aquasecurity/trivy/trivy # macOS
# or
sudo apt install trivy # Ubuntu/Debian
trivy --version
```

### 3.9. Install OWASP ZAP (for API Security Testing)
- Download from: https://www.zaproxy.org/download/
- Or install via Homebrew:
```bash
brew install --cask owasp-zap
```

---

## 4. Deploy the Application

1. Push your manifests/Helm charts to your Git repo.
2. Create Argo CD Applications (see `argocd/` directory).
3. Sync Applications in Argo CD UI or CLI:
```bash
argocd app sync <app-name>
```

---

## 5. Additional Notes
- Adjust server count and specs based on load.
- Secure all endpoints and dashboards before production.
- For production, use managed Kubernetes (EKS/AKS) and managed databases.
- For SonarQube, Trivy, and ZAP, integrate with your CI/CD pipeline for best results.

---
