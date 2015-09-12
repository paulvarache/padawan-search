# Padawan search
--------------------------------------------------------------------------------

A fast made webapp/API sample.


# Easy Start
The quicker way to start the app, is to use the Vagrantfile provided. It will
create a VM with everything needed. Then you just need to add this hosts:
 - 192.168.8.11 search.padawan.local.com api.search.padawan.local.com

It is required since Nginx uses the host to redirect the request.

```shell
vagrant up
vagrant ssh
cd /var/www/wclient
bower install
cd /opt/api
npm install
./bin/www --config=./config/dev | bunyan
```

# Manual Start

If you want to start the app by your own, you will need more informations

## Architecture
 - Elasticsearch: Stores the data. (1.7.1)
 - Node.js: Provides an API. (4.0)
 - Static file server: Delivers the webclient

To start the API, use the api/bin/www script (you must be on the api folder)

This script gives you some options:

```
Usage: index.js --config [configFile] --log-level [TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

Options:
  --config     Path to the configuration file       [required]
  -h           Show help                             [boolean]
  --log-level                                [default: "INFO"]
```

*example*
```shell
./bin/www --config=./config/dev --log-level=DEBUG
```

You can configure the location of your elasticsearch instance and the
listenning port of the API in a config file e.g. api/config/dev.js

You can use the option --load to put the data from data.json into elasticsearch.

```shell
./bin/www --config=./config/dev --load
```

This API uses bunyan as logger so it will output json. If you want to have human readable logs, just pipe the process into the bunyan cli that can be installed with

```shell
sudo npm install -g bunyan
```

When your API is running, you'll have to configure the webclient. Open the wclient/src/index.html and locate a script element that defines an apiConfig key in the window.

```js
window.apiConfig = {
    host: 'api.search.padawan.local.com',
    port: 80,
    secure: false,
    prefix: '/v1'
}
```

Just adapt these values to your API location.

Use a static file server as Apache or Nginx to deliver the content of wclient/src and the app should run.
