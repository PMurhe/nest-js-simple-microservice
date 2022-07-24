Start Commands for docker-compose file
Builds, (re)creates, starts, and attaches to containers for a service.
docker-compose up

Start Commands for Docker
Build your image:
docker build <your path> -t <<user>/project-name>

Run:
docker run -p 8080:3000 <<user>/project-name>

For Example:
docker build <your path> -t pmurhe/nestjs-dockerized
docker run -p 8080:3000 pmurhe/nestjs-dockerized

Basic Docker Commands:
List your docker images: docker images
List your running containers: docker ps
