# Start server deployment
docker build -t public.ecr.aws/w9q7p0v3/bet31nba/server:latest .
docker push public.ecr.aws/w9q7p0v3/bet31nba/server:latest
aws apprunner update-service --cli-input-json file://Update/AppRunner.server.json
