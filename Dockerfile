# Node Container

# Use Red Hat UBI 9 as the base image
FROM redhat/ubi9-minimal:latest

ENV NODE_ENV=production
ENV PORT=3000

# Install Node & npm
RUN microdnf install -y nodejs npm && \
    microdnf clean all

# Create a non-root user and switch to it (Change user name and UID as needed)
RUN useradd -r -u 1001 rwapps

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && \
    npm cache clean --force

COPY . .

USER 1001

# Host port. The port that is exposed by the application on the server. Change accordingly.
EXPOSE $PORT

CMD ["node", "server.js"]

# Run this to build this image "docker build -t <mage_name>:<version> ."
# To tag this image "docker tag <image_name>:<version> <repository>/<image_name>:<version>"
# Run this as "docker run -d --restart always -p <host_port>:<container_port> --env-file .env --name <app_name> <image_name>:<version>"

# Default port: 3000

# docker buildx build   --platform linux/amd64,linux/arm64   -t ravindutw/node-test:2   --push .

# docker run -d --restart always -p 3000:3000 --env-file .env --name wmt wmtlab9:latest
