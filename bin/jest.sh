#!/bin/bash
PARENT_DIR=$(cd $(dirname $0)/..; pwd)
UNIT_DIR=$PARENT_DIR/test/unit
SPECS_DIR=$UNIT_DIR/specs
CONFIG_JS=$UNIT_DIR/jest.conf.js
JEST="jest"
if [ $# -eq 0 ] ; then exit ; fi

SPEC_FILE=$1
if [ ! -f $SPEC_FILE ] ; then
  SPEC_FILE=$SPECS_DIR/$1
  if [ ! -f $SPEC_FILE ] ; then
    SPEC_FILE=$SPEC_FILE.spec.js
    if [ ! -f $SPEC_FILE ] ; then
      echo "File not found: $SPEC_FILE"
      exit 1
    fi
  fi
fi

$JEST --config $CONFIG_JS $1
