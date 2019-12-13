#!/bin/bash

mkdir -p docker/docker-webapp/config-webapp
mkdir -p docker/runOperator/config-operator
cp -R docker/config/* docker/docker-webapp/config-webapp
cp -R docker/config/* docker/runOperator/config-operator