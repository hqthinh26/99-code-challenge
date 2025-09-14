# HOW TO RUN THE SOFTWARE

### API Documentation

- Please refers the provided link below to access the server's api documetation
- [API_DOCUMENTATION](https://www.postman.com/self-promoting/workspace/99-code-challenge/request/24666459-4ba29e12-ab08-41b2-896d-fe47c3c0e322?action=share&creator=24666459)

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
