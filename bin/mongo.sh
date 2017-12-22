#!/bin/bash
DB_NAME=quizcloud
DB_USER=quizcloud
DB_PASSSWORD=quizcloud

mongo -u $DB_USER -p $DB_PASSSWORD --authenticationDatabase $DB_NAME
