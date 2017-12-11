#!/bin/bash
OUTER_PORT=80
INNER_PORT=80
IMAGE_NAME=qc-nginx
CONTAINER_NAME=qc-nginx
SCRIPT_DIR=$(cd $(dirname $0);pwd)
PARENT_DIR=$(cd $(dirname $SCRIPT_DIR);pwd)

function usage() {
cat <<_EOT_
Usage:
  $0 run
  $0 stop
_EOT_
}

function build() {
  docker build -t $IMAGE_NAME $PARENT_DIR/build/docker/nginx
  return $?
}

function run() {
  docker run -d -p ${OUTER_PORT}:${INNER_PORT} \
    -v $PARENT_DIR/dist:/usr/share/nginx/html:ro \
    --rm --name ${CONTAINER_NAME} $IMAGE_NAME
  return $?
}

function bash() {
  docker run -it \
    -v $PARENT_DIR/dist:/usr/share/nginx/html:ro \
    --rm --name ${CONTAINER_NAME} $IMAGE_NAME /bin/bash
  return $?
}

function stop() {
  docker stop $CONTAINER_NAME
  return $?
}

if [ "$OPTIND" = 1 ]; then
  while getopts abf:h OPT
  do
    case $OPT in
      h)
        usage
        exit 0
        ;;
      \?)
        usage
        echo "Try to enter the h option." 1>&2
        exit 1
        ;;
    esac
  done
else
  echo "No installed getopts-command." 1>&2
  exit 1
fi

shift $((OPTIND - 1))

if [ $1 = "" ]; then
  usage
  exit 1
fi

cmd=$1
case $cmd in
  build)
    build
    ;;
  run)
    run
    ;;
  bash)
    bash
    ;;
  stop)
    stop
    ;;
  *)
    usage
    exit 1
    ;;
esac
