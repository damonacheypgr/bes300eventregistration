# Doing some Kubernetes

1. Enable Kubernetes Locally with Docker
1. Go to [Dashboard](https://github.com/kubernetes/dashboard)
1. Follow the Getting Started Steps
1. Create a user and binding:
 
    1. `kubectl apply -f user.yaml`
    1.  `kubectl apply -f binding.yaml`

1. Create a token:

    1. `kubectl -n kubernetes-dashboard get secret $(kubectl -n kubernetes-dashboard get sa/admin-user -o jsonpath="{.secrets[0].name}") -o go-template="{{.data.token | base64decode}}"`