public_path="./backend/express/public"
build_public_path="./backend/build/express/public"

host_app_build_dir="./frontend/host-app/build"
main_app_build_dir="./frontend/main-app/build"
guest_app_build_dir="./frontend/guest-app/build"

mkdir $public_path
mkdir $build_public_path

cd ./frontend

echo 'build main-app'
cd ./main-app
yarn install
yarn lint:fix
yarn build
cd ..

echo "build guest-app"
cd ./guest-app
yarn install
yarn lint:fix
yarn build

cd ..

echo "build host-app"
cd ./host-app
yarn install
yarn lint:fix
yarn build
cd ..

cd ..

echo "dump react app into backend public dir"

echo "dump host app"
cp -r $host_app_build_dir "$build_public_path"
rm -rf "$build_public_path/host-app/"
mv "$build_public_path/build/" "$build_public_path/host-app/"

cp -r $host_app_build_dir "$public_path"
rm -rf "$public_path/host-app/"
mv "$public_path/build/" "$public_path/host-app/"

echo "dump guest app"
cp -r $guest_app_build_dir "$build_public_path"
rm -rf "$build_public_path/guest-app/"
mv "$build_public_path/build/" "$build_public_path/guest-app/"

cp -r $guest_app_build_dir "$public_path"
rm -rf "$public_path/guest-app/"
mv "$public_path/build/" "$public_path/guest-app/"

echo "dump main app"
cp -r $main_app_build_dir "$build_public_path"
rm -rf "$build_public_path/main-app/"
mv "$build_public_path/build/" "$build_public_path/main-app/"

cp -r $main_app_build_dir "$public_path"
rm -rf "$public_path/main-app/"
mv "$public_path/build/" "$public_path/main-app/"
