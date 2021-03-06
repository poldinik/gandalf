#!/bin/bash

root_folder=$(cd $(dirname $0); cd ..; pwd)

exec 3>&1

function _out() {
  echo "$(date +'%F %H:%M:%S') $@"
}

function test() {
  _out Start serving application...
  source venv/bin/activate
  pytest -v -o log_cli=true
}

test