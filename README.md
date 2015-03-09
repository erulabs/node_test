NodeJS Test application
=========

This is a simple NodeJS application which contains some standard pieces:

1. Depedancies (use `npm install`)
2. A build system (`guld build` required to compile the /build/ directory)
3. Static content to be served by a reverse proxy like Nginx (the /build/ directlry)
4. An API server which needs to be proxied to on ^/api/\*
5. A display page which makes an AJAX call to the API in order to test things properly :)
