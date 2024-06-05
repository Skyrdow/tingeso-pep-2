cd .\config-server\
mvn clean install
docker build -t skyrdow/t2-config-server .
docker push skyrdow/t2-config-server
cd ..

cd .\eureka-server\
mvn clean install
docker build -t skyrdow/t2-eureka-server .
docker push skyrdow/t2-eureka-server
cd ..

cd .\gateway-server\
mvn clean install
docker build -t skyrdow/t2-gateway-server .
docker push skyrdow/t2-gateway-server
cd ..

cd .\ms-repair-list\
mvn clean install
docker build -t skyrdow/t2-ms-repair-list .
docker push skyrdow/t2-ms-repair-list
cd ..

cd .\ms-repairs\
mvn clean install
docker build -t skyrdow/t2-ms-repairs .
docker push skyrdow/t2-ms-repairs
cd ..

cd .\ms-reports\
mvn clean install
docker build -t skyrdow/t2-ms-reports .
docker push skyrdow/t2-ms-reports
cd ..

cd .\ms-vehicles\
mvn clean install
docker build -t skyrdow/t2-ms-vehicles .
docker push skyrdow/t2-ms-vehicles
cd ..

cd .\frontend-2\
npm run build
docker build -t skyrdow/t2-frontend .
docker push skyrdow/t2-frontend
cd ..

kubectl delete -f .\postgres-config-map.yaml
kubectl delete -f .\postgres-secrets.yaml
kubectl delete -f .\config-server-deployment-service.yaml
kubectl delete -f .\eureka-server-deployment-service.yaml
kubectl delete -f .\gateway-server-deployment-service.yaml
kubectl delete -f .\repair-list-db-deployment-service.yaml
kubectl delete -f .\repairs-db-deployment-service.yaml
kubectl delete -f .\reports-db-deployment-service.yaml
kubectl delete -f .\vehicles-db-deployment-service.yaml
kubectl delete -f .\ms-repair-list-deployment-service.yaml
kubectl delete -f .\ms-repairs-deployment-service.yaml
kubectl delete -f .\ms-reports-deployment-service.yaml
kubectl delete -f .\ms-vehicles-deployment-service.yaml
kubectl delete -f .\frontend-deployment-service.yaml

kubectl apply -f .\postgres-config-map.yaml
kubectl apply -f .\postgres-secrets.yaml
kubectl apply -f .\config-server-deployment-service.yaml
kubectl apply -f .\eureka-server-deployment-service.yaml
kubectl apply -f .\gateway-server-deployment-service.yaml
kubectl apply -f .\repair-list-db-deployment-service.yaml
kubectl apply -f .\repairs-db-deployment-service.yaml
kubectl apply -f .\reports-db-deployment-service.yaml
kubectl apply -f .\vehicles-db-deployment-service.yaml
kubectl apply -f .\ms-repair-list-deployment-service.yaml
kubectl apply -f .\ms-repairs-deployment-service.yaml
kubectl apply -f .\ms-reports-deployment-service.yaml
kubectl apply -f .\ms-vehicles-deployment-service.yaml
kubectl apply -f .\frontend-deployment-service.yaml

psql -U postgres

minikube service gateway-server-service