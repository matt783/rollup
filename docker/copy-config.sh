#!/bin/bash

mkdir -p docker-webapp/config-webapp
mkdir -p runOperator/config-operator
cp -R deployContracts/config-deploy/*.json docker-webapp/config-webapp
cp -R deployContracts/config-deploy/*.json runOperator/config-operator