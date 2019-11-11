# babel build bash script
start=$SECONDS

#args
source_dir="./"
out_dirs="./build/"
ignore_dirs='node_modules,app,server/public,spec,webpack,build,doc,script'

echo "run babel"
npx babel $source_dir --out-dir $out_dirs --ignore $ignore_dirs --verbose --source-maps

echo "copy .env"
cp .env ./build/.env

echo "copy *.graphql"
cp ./graphQL/typeDefs/*.graphql ./build/graphQL/typeDefs/

end=$SECONDS
duration=$((end - start))
echo "stuff took $duration seconds to complete"
