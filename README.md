# Yuncode

Author: Lei Ding (USC ID: leid)

This is a coding challenge website project for EE599.

## Features

- Create and submit new coding problems.
- Browse list of coding problems with likes and dislikes.
- Provide code editor and server-side compiling capability.
- Utilize database for persistent data storage.
- Server can routinely delete unpopular problems based on likes and dislikes.
- Minimalist and material design.

## Development tools

- Frontend platform: Angular (JavaScript, TypeScript, HTML, CSS)
- Backend platform: NodeJS (Express library)
- Database: MongoDB (Mongoose library)

## Get it running

Since the frontend and the backend are developed separately. Required modules need to be installed separately for each part.

**Frontend:**

Redirect to **frontend** root folder and install required npm modules:

```shell
npm install
```

Start Angular development server:

```shell
ng serve
```

The frontend server will be hosted at port 4200. Navigate to `http://localhost:4200/` for the page view.

**Backend:**

Redirect to **backend** root folder and install required npm modules:

```shell
npm install
```

Start Express backend server with nodemon for development purpose (defined in package.json):

```shell
npm run start:server
```

The backend server will be hosted at port 3000 by defualt.

## Website structure

The website has three main views: homepage, add-problem page, solve-problem page, with a navigation panel fixed on top with a home button ("Yun://Code") on the left and add problem button ("Add Problem!") on the right.

**homepage view:**

![homepage view](/sample images/homepage.png?raw=true "homepage view")
