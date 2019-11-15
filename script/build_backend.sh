echo "build backend"

cd ./backend

echo "install package"
yarn install

echo "fix lint"
yarn lint:fix

echo "babel compile"
yarn build

echo "build docker image"
yarn docker:build:force
