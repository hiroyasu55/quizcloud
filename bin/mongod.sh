#!/bin/bash
CURRENT_DIR=$(cd $(dirname $0)/../;pwd)
MONGODB_DIR=$CURRENT_DIR/mongodb
MONGODB_PORT=27017

mongod --auth --config $MONGODB_DIR/mongod.conf
