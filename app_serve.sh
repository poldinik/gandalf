#!/bin/bash

root_folder=$(cd $(dirname $0); cd ..; pwd)

exec 3>&1

function _out() {
  echo "$(date +'%F %H:%M:%S') $@"
}

function serve() {
  _out Start serving application...
  source venv/bin/activate
  python gandalf_app/app.py
}

serve