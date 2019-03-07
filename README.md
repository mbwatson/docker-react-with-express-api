# React Frontend Backed by Express API with Docker Compose

This is a two-container web application consisting of React frontend served with Nginx and an API served with Express from a Node container. This is merely intended to serve as a jumping-off point for building such an application, and it comes ready with a test endpoint being used to pull information into the frontend.

## Setup

we'll assume Docker is already installed.

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
$ git clone https://github.com/mbwatson/docker-nginx-react-node-api.git
```

### Set up environment variables file

Make an environment variables file named `.env`. There's a sample one--`.env.sample`--in place that will work for development out of the box, so just copy that.

```bash
$ cp .env.sample .env
```

This file contains a couple environment variables: `NODE_ENV` and `API_PORT`. The `NODE_ENV` is set to development by default and can be (and is) overridden in the production Compose file. The `API_PORT` specifies the port to esrve the API on.

### Start 

There are two services to run--they are named `frontend` and `api`.

#### Development

Start both services:

```bash
$ docker-compose up
```

The above command starts and attaches to the three containers and results in output like the following.

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
react       | 
  .
  .
  .

```

If necessary, it will build the images first.

##### Possibly Useful Notes

It's nice to leave your session attached to keep an eye on errors, but of course you want to rebuild and/or detach at times:

```bash
$ docker-compose up --build -d
```

Or only start a single services, specify it explicitly:

```bash
$ docker-compose up api
```

The above command starts only the `api`. This is nice if you want to test the API with a tool like Postman.

You can also just build a specific image.

```bash
$ docker-compose up --build frontend
```

Anyway, after starting both containers. Point your browser to `http://localhost:3000` to see the React application. To mess with the API directly (in the browser or with something like Postman, say), that is served to `http://localhost:3030`, replacing the `3030` with another port if you made a change to `.env` above.

##### Verify it Works

Notice now if everything is working correctly. You should a rotating React logo, much like the out-of-the-box result from running Create React App. You should also see a "Response from API" block with "You hit the API test endpoint!" displayed.

##### Trace the Communication

That text is being served from the `api` container, and you can trace the entire interaction to make sense of the communication between the containers.

On the frontend, you see that `/frontend/src/App.js` uses the `ApiTestCard` component, which receives the test endpoint as a prop, which in turn makes the call (with Axios) to the test endpoint, and then shows the response on the page.

On the backend you can trace the call to the test endpoint through `/api/app.js` to `/api/routes/test.js` to `/api/controllers/test.js`. 

##### Hot Reloading

Note the development `frontend` and `api` services start with React's development server and Nodemon, respectively, allowing hot reloading. This is great for speeding up the development process, which can take place entirely within the containers. The source files are mapped to the host machine, however, so you can also develop outside the containers. It is, however, necessary to rebuild the images during development if new modules are installed.

##### Installing New Node Modules

If, for example, you execute `npm install some-tool` to install a module (which would of course be done from within the `frontend/` directory), the next time `docker-compose up` is run, the `--build` flag will need to be used so that `some-tool` is installed on the image before the container spins up.

Alternatively, you could circumvent this by logging into the running `react` container and `npm install` it there in (the default location) `/usr/src/app`.

#### Production

Start both services by specifying the production-specific Docker Compose file, `docker-compose.prod.yml`:

```bash
$ docker-compose -f docker-compose.prod.yml up --build -d
```

This serves the frontend to port `80` on the host, and is thus reachable simply at `http://localhost`. The API is publicly accessible via `http://localhost/api` because the Nginx reverse proxies requests to `/api/` to port `3030` in the `api` container.


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
