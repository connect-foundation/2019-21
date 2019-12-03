guest_app="cd ./frontend/guest-app & yarn start"
main_app="cd ./frontend/main-app & yarn start"
host_app="cd ./frontend/host-app & yarn start"
socketIO_server="cd ./backend & yarn start:socket"
express_server="cd ./backend & yarn start:express"
DB_server="cd ./backend & yarn start:DB"
yoga_server="cd ./backend & yarn start:yoga"

concurrently "$guest_app"  "$main_app"  "$host_app" "$socketIO_server" "$express_server" "$DB_server" "yoga_server"