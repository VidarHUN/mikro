#!/bin/bash

kubectl create -f service-account.yaml
kubectl create -f traefik-cr.yaml
kubectl create -f traefik-crb.yaml
kubectl create -f traefik-deployment.yaml
kubectl create -f traefik-svc.yaml
kubectl create -f traefik-webui-svc.yaml
kubectl create -f traefik-ingress.yaml 
echo "$(minikube ip) traefik-ui.minikube" | sudo tee -a /etc/hosts
