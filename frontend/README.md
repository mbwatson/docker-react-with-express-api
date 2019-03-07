# Trial Innovation Center Dashboard

## Setup

We'll assume you have Docker installed and working.

### Install Docker Compose

These steps were pulled right from the [Docker documentation](https://docs.docker.com/compose/install/).

1. Install Docker Compose.

First, you may want to check the current release and replace the `1.23.2` in the command below if necessary.

```bash
$ sudo curl -L "https://github.com/docker/compose/releases/download/1.23.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

2. Make it executable.

Next, set the permissions to make the binary executable:

```bash
$ sudo chmod +x /usr/local/bin/docker-compose
```

3. Verify it's working as expected.

Then, verify that the installation was successful by checking the version:

```bash
$ docker-compose --version
```

This will print out the version you installed:

```bash
docker-compose version 1.23.2, build 1110ad01
```

## Application Setup

### Clone

Fork and clone this repo.

```bash
$ git clone https://github.com/mbwatson/docker-nginx-react-with-node-api.git
```

### Set up environment variables file

Make an environment variables file named `.env`. There's a sample one (`.env.sample`) in the repo that will work for development out of the box, so just copy that.

```bash
$ cp .env.sample .env
```

This file contains environtment variables for configuring the container environment. `NODE_ENV=development` is the default and can be overridden in the Compose file. The `API_PORT` variable will determine the port on which the api is accessed.

#### Development

Start both services:

```bash
$ docker-compose up
```

The above command starts and attaches to the two containers and results in output like the following.

```bash
Starting node ... 
Starting react ... 
Starting react
Starting react ... done
Attaching to node, react
node        | 
node        | > api@1.0.0 start /usr/src/app
node        | > nodemon app
node        | 
node        | [nodemon] 1.18.10
node        | [nodemon] to restart at any time, enter `rs`
node        | [nodemon] watching: *.*
node        | [nodemon] starting `node app.js`
node        | 
node        | Shhh... I'm listening on port 3030.
node        | 
react       | 
react       | > app@0.1.0 start /usr/src/app
react       | > react-scripts start
react       | 
react       | Starting the development server...
react       | 
react       | Compiled successfully!
react       | 
react       | You can now view app in the browser.
react       | 
react       |   Local:            http://localhost:3000/
react       |   On Your Network:  http://192.168.112.3:3000/
react       | 
react       | Note that the development build is not optimized.
react       | To create a production build, use npm run build.
  .
  .
  .

```

##### Possibly Useful Notes

It's nice to leave your session attached to keep an eye on errors, but of course you want to rebuild and/or detach at times:

```bash
$ docker-compose up --build -d
```

Or only start a couple services, specify them explicitly:

```bash
$ docker-compose up api
```

The above command starts the `api` and its dependency. You can also just build specific images.

```bash
$ docker-compose up --build api
```

Point your browser to `http://localhost:3000` to see the React application.
To mess with the API directly (in the browser or Postman, say), that is served to `http://localhost:3030`.

##### Hot Reloading

Note the development `frontend` and `api` services start with React's development server and nodemon, respectively, allowing hot reloading, so it's only necessary to rebuild during development if new packages are installed.

##### Installing New Modules

If, for example, you execute `npm install some-tool` to install a module (which would of course be done from within the `frontend/` directory), the next time `docker-compose up` is run, the `--build` flag will need to be used so that `some-tool` is installed on the image before the container spins up.

Alternatively, you could circumvent this by logging into the running `react` container and `npm install` it there in (the default location) `/usr/src/app`.

#### Production

##### OK, Let's Go

Start all three services using the production Docker Compose file, `docker-compose.prod.yml`:

```bash
$ docker-compose -f docker-compose.prod.yml up --build -d
```

This serves the frontend to port `80` on the host, and is thus reachable simply at `http://localhost`. The API is publicly accessible via `http://localhost/api`, because that `nginx.conf` file is used to route traffic from that path to port `3030` in the `api` container.

#### Tear it Down

If you started without the detach flag, `-d`, you can stop the containers running with `CTRL+C`, and Docker will clean up after itself. If you ran things in detched mode (_with_ the `-d` flag), then bring everything down with the following command. 

```bash
$ docker-compose down
```

## References

Links to some tools used in this project are below.

- Docker
  + Docker: [https://docs.docker.com](https://docs.docker.com)
  + Docker Compose: [https://docs.docker.com/compose/](https://docs.docker.com/compose/)
  + Docker Multi-Stage Builds [https://docs.docker.com/develop/develop-images/multistage-build/](https://docs.docker.com/develop/develop-images/multistage-build/)
- React
  + React JS: [https://reactjs.org/](https://reactjs.org/)
- Nodemon [https://nodemon.io/](https://nodemon.io/)
- Express [https://expressjs.com/](https://expressjs.com/)
- Nginx: [https://nginx.org/en/docs/](https://nginx.org/en/docs/)
