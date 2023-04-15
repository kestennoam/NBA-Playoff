# Start server deployment
docker build -t public.ecr.aws/w9q7p0v3/bet31nba/client:latest -f .\Dockerfile.client .
docker push public.ecr.aws/w9q7p0v3/bet31nba/client:latest
aws apprunner create-service --cli-input-json file://Deploy/AppRunner.client.json
