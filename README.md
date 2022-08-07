This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm run dev
```

## Design

This project is a fullstack application, powered by Next.js, it is a flexible React framework that gives us building blocks to create fast web applications.
Why i choose it?

* User Interface  - React is a JavaScript library for building interactive user interfaces.By library, we mean React provides helpful functions to build UI,
but leaves it up to the developer where to use those functions in their application.
* Routing - Next.js has a file-system based router built on the concept of pages. the files inside the pages directory can be used to define most common patterns.
* Data Fetching - Data fetching in Next.js allows you to render your content in different ways, depending on your application's use case.
These include pre-rendering with Server-side Rendering or Static Generation, and updating or creating content at runtime with Incremental Static Regeneration.
* Rendering - render static or dynamic content, nice SEO.
* Performance -  The Next.js Compiler, written in Rust using SWC, allows Next.js to transform and minify your JavaScript code for production.
This replaces Babel for individual files and Terser for minifying output bundles. Compilation using the Next.js Compiler is 17x faster than Babel and enabled by default since Next.js version 12.

## Project 
root
```
|-- components
|-- hooks
|-- libs
|-- pages
    |-- api         
    |-- posts
|-- public
|-- scripts
```

## Deploy

- Install Docker on your machine.
- Build your container:

```bash
docker build -t nextjs-jianshu-docker .
```

- Run your container:

```bash
# By using an environment variable, you will set the connection string to a different value depending on where you are running this container.
# mongodb host need instead by your ip
docker run -p 3000:3000 -e MONGODB_CONN_STRING=mongodb://192.168.31.182:27017  -e MONGODB_DB_NAME=jianshu -e MONGODB_POST_COLLECTION_NAME=posts -e MONGODB_USER_COLLECTION_NAME=users  nextjs-jianshu-docker
```

## MongoDB Setup

```bash
docker pull mongo:latest
docker run --name mongodb -d -p 27017:27017 -v ~/mongo/data/configdb:/data/configdb -v ~/mongo/data/db:/data/db mongo

```

## Prepare Data
copy the links to browser, and call the api, waiting for the app to import data to db
```
http://127.0.0.1:3000/api/post/init
http://127.0.0.1:3000/api/users/init
```

