#!/bin/bash

mkdir -p docker/docker-webapp/config
mkdir -p docker/runOperator/config
cp -R docker/config/* docker/docker-webapp/config
cp -R docker/config/* docker/runOperator/config