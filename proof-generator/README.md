# Proof Service
API server used to integrate [cusnark](https://github.com/iden3/cusnarks) for generating proofs using GPU acceleration.

## API

The API specification is written following the [Open API Specification (OAS) 3.0](https://swagger.io/specification/).
In order to make life easier some [open source tools](https://swagger.io/tools/open-source/) are used to:
- Edit the specification.
- Generate server code: endpoints and validation.
- Host a nice looking and interactive documentation.

***All the following commands are supposed to be run from the root of this git repo, unless the oposite is said***

###  View / Edit the specification

Of course you can use your favorite IDE to edit (path to the repo)/proof-generator/spec.yaml. However using a OAS specific editor is recommended as it provides nice features such as validation and frontend documentation preview. The recommended editor is [Swagger editor](https://github.com/swagger-api/swagger-editor):

- Using docker:
0. Install Docker (if you don't have it already)
1. `docker pull swaggerapi/swagger-editor`
2. `docker run --rm --name swagger-editor -d -p 80:8080 swaggerapi/swagger-editor`
3. Use your browser: http://localhost:80
4. Import the file: File/Import file => (path to the repo)/proof-generator/spec.yaml
5. Save changes: File/Save as YAML => Move the file from your Downloads directory to the path of the repo and replace the old version. ***NOTE: Docker will keep changes made to browser sessions, even if the container is restarted, however the only way to persist changes is to export the file as described in this point.***
6. To stop the server: `docker kill swagger-editor`

- Run locally *Not tested*:
0. Install Node 6.x and NPM 3.x (if you don't have it already)
1. Clone the [repo](https://github.com/swagger-api/swagger-editor)
2. Run `npm start`

- Use a hosted solution like [swagger hub](https://swagger.io/tools/swaggerhub/) *Not tested*

### Generate code

The API server code is based on the generated code of [swagger-codegen](https://github.com/swagger-api/swagger-codegen).

By doing so, consistency between documentation and the deployed service is ensured. Additionally you get effortless input validation, mock ups when the functionalities are not implemented and 0 boilerplate writing.

When changes to spec.yaml are made, the generated code should be updated, without overwriting the actual code and changes should be merged. To do so:

0. Install Docker (if you don't have it already)
1. Export code in nodejs-server language: `docker run --rm --name swagger-codegen -v ${PWD}/proof-generator:/local swaggerapi/swagger-codegen-cli generate -i /local/spec.yaml -l nodejs-server -o /local/codegen` ***Note that you can use other languages, for instance to generate client code***
2. Check differences between fresh generated code (proof-generator/codegen) and current server code (proof-generator/code). It's recommended to use a diff tool such as [Meld](http://meldmerge.org/) to see changes and merge them. In general the changing parts are: proof-generator/src/api/swagger.yaml (take all the changes from the codegen version), files under the controller directory (only take the function definitions and inputs from codegen), files under the service directory (only take the function definitions and the example values in case the logic is not implemented yet and inputs from codegen) *If permission errors are thrown, run:* `sudo chown -R $USER proof-generator/codegen`

### Run the API server

0. Compile the circuit: `node --max_old_space_size=4000 compiler.js -t 4 -l 8`. (Replace 4 and 8 for the desired number of transactions/levels) (Run the comand from proof-generator/src/circuit directory). Edit ProofGeneratorService to use one of the compiled circuits (*const circuitFile = ...*).
0. ***MISSING EXPLANATION: config-example.json ==> config.json + cusnarks setup***
1. Run the server: `cd proof-generator/src && npm start | cd ../..`
2. The server will be listening at http://localhost:8080. To easily test changes, the specification can be imported in [Postman](https://www.getpostman.com/) as a collection (In postman: import -> path/to/repoDirectory/proof-generator/spec.yaml).
3. To stop the server: `Ctrl+C`


### View the documentation

In order to offer access to the API documentation to consumers and developers, [Swagger UI](https://github.com/swagger-api/swagger-ui) is used. This can be hosted in different ways:

- Using docker:
0. Install Docker (if you don't have it already)
1. `docker pull swaggerapi/swagger-ui`
2. `docker run --rm --name swagger-ui -d -p 80:8080 -e SWAGGER_JSON=/doc/spec.yaml -v ${PWD}/proof-generator:/doc swaggerapi/swagger-ui`
3. Use your browser: http://localhost:80
4. To stop the server: `docker kill swagger-ui`

## Deploy

TBD

## TO DO

0. Back to realness (HAVE A LOOK AT: "// UNCOMMENT FOR REALNESS")
0. Move config const values into a config.json
1. Implement cancel call ==> not implemented on cusnarks yet (blocking dep)
2. Test generate call
3. Improve validation and descriptions 