#!/bin/bash

mkdir -p docker/docker-webapp/config-webapp
mkdir -p docker/runOperator/config-operator
cp -R docker/deployContracts/config-deploy/*.json docker/docker-webapp/config-webapp
cp -R docker/deployContracts/config-deploy/*.json docker/runOperator/config-operator