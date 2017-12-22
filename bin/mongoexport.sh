#!/bin/bash
DB_HOST=localhost
DB_PORT=27017
DB_NAME=quizcloud
DB_USER=quizcloud
DB_PASSSWORD=quizcloud
COLLECTION_NAME=quizes

CURRENT_DIR=$(cd $(dirname $0);pwd)
BACKUP_DIR=$CURRENT_DIR/../mongodb/backup
if [ ! -d $BACKUP_DIR ] ; then mkdir -p $BACKUP_DIR ; fi
filename=$BACKUP_DIR/${COLLECTION_NAME}_`date '+%Y%m%d%H%M%S'`.json

mongoexport \
  -h $DB_HOST:$DB_PORT \
  -d $DB_NAME \
  -c $COLLECTION_NAME \
  -u $DB_USER -p $DB_PASSSWORD \
  -o $filename \
  --type JSON \
  --authenticationDatabase $DB_NAME
