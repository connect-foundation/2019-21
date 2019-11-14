root_path=pwd

public_path="./backend/express/public"
build_public_path="./backend/build/express/public/"

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
host_app_build_dest_dir="./backend/build/express/public/host-app"
cp -r $host_app_build_dir "$public_path/host-app"
cp -r $host_app_build_dir $host_app_build_dest_dir

echo "dump guest app"
guest_app_build_dest_dir="./backend/build/express/public/guest-app"
cp -r $guest_app_build_dir "$public_path/guest-app"
cp -r $guest_app_build_dir $guest_app_build_dest_dir

echo "dump main app"
main_app_build_dest_dir="./backend/build/express/public/main-app"
cp -r $main_app_build_dir "$public_path/main-app"
cp -r $main_app_build_dir $main_app_build_dest_dir
