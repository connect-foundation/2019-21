start=$SECONDS

echo "1/3 build node image"
docker build -t demetoir:node -f ./docker/dockerfiles/node.Dockerfile .

echo "2/3 build express image"
docker build -t demetoir:express -f ./docker/dockerfiles/express.Dockerfile .

echo "3/3 build graphql image"
docker build -t demetoir:graphql -f ./docker/dockerfiles/graphql.Dockerfile .

end=$SECONDS
duration=$((end - start))
echo "stuff took $duration seconds to complete"
