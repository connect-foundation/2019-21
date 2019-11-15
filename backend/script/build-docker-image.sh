NODE_IMAGE_NAME=$(grep NODE_IMAGE_NAME .env | cut -d '=' -f2)

cached_package_dir=./docker/cached
cached_package_json=./docker/cached/package.json
cached_yarn_lock=./docker/cached/yarn.lock

build_node_docker_image() {
  echo "start build docker image of node"
  docker build -t "$NODE_IMAGE_NAME" -f ./docker/dockerfiles/node.Dockerfile .

  echo "update cache package.json"
  mkdir $cached_package_dir
  cp ./package.json $cached_package_json
  cp ./yarn.lock $cached_yarn_lock
}

if [[ -d $cached_package_dir ]] && [[ -f $cached_package_json ]] && [[ -f $cached_yarn_lock ]]; then
  package_diff=$(diff $cached_package_json ./package.json)
  package_lock_diff=$(diff $cached_yarn_lock ./yarn.lock)
  if [[ "$package_diff" != "" ]] || [[ "$package_lock_diff" != "" ]]; then
    echo "package cache miss"
    echo "$package_diff"
    echo "$package_lock_diff"
    build_node_docker_image
  fi
else
  echo "package or lock file not found"
  build_node_docker_image
fi
