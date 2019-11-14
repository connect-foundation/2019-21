BRANCH_NAME="master"

echo "fetch from remote"
git fetch

echo "checkout target branch $BRANCH_NAME"
git checkout $BRANCH_NAME

head="$(git rev-parse HEAD)"
remote_head="$(git rev-parse origin/$BRANCH_NAME)"

echo "local branch head $head"
echo "remote branch head $remote_head"
if [[ $head != $remote_head ]]; then
  echo "version outdated"
  git pull
  yarn deploy
else
  echo "everything up-to-date"
fi