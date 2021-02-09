#!/bin/bash

root_folder=$(cd $(dirname $0); cd ..; pwd)

exec 3>&1

function _out() {
  echo "$(date +'%F %H:%M:%S') $@"
}

function install() {
  _out installing...
  virtualenv -p `which python3` venv
  _out virtualenv activate...
  source venv/bin/activate
  pip install -r requirements.txt
  cd jpegio
  python setup.py install
  rm -rf tests
  cd ..
  python setup.py develop
  _out virtualenv deactivate...
  deactivate
  _out done!
}

install