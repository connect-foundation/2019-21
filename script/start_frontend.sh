guest_app="cd ./frontend/guest-app & yarn start"
main_app="cd ./frontend/main-app & yarn start"
host_app="cd ./frontend/host-app & yarn start"

concurrently "$guest_app"  "$main_app"  "$host_app"