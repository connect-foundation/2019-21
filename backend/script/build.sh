# babel build bash script
start=$SECONDS

echo "init build directory"
rm -rf "./build"
mkdir "./build"
cp -r ./DB ./build/DB
cp -r ./express ./build/express
cp -r ./socket_io_server ./build/socket_io_server
cp -r ./graphQL ./build/graphQL
cp -r ./libs ./build/libs
cp -r ./redis ./build/redis

cp .env ./build/.env

source_dir="./build"
out_dirs="./build"
ignore_dirs='build/express/public'

echo "run babel"
npx babel $source_dir --out-dir $out_dirs --ignore $ignore_dirs --verbose --source-maps

end=$SECONDS
duration=$((end - start))
echo "stuff took $duration seconds to complete"
