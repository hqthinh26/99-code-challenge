# HOW TO RUN THE SOFTWARE

### Prerequisite

- Docker installed - https://docs.docker.com/engine/install/
- Activate the Docker Daemon (Dockerd)

### Development

#### On 1st run - Running only this command is enough

```SHELL
npm run server:dev
```

#### NPM Libraries Installation

- Step 1: Install the library using the npm command
- Step 2: Re-build the server image to refresh to anonymous docker volumn

```SHELL
npm run server:build
```

### Clean Up

1. You can wipe everything, regarding to the server using the following command, including the database data.

```SHELL
npm run server:down
```
