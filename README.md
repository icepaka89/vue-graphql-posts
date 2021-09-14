## Posts App Using Vue + GraphQL

This project contains a basic node app that uses **Apollo Server** to expose a graphql api on port 4000. It also includes a frontend application, written in Vue with **vue-apollo**, which connects to the api to manage and update posts. The purpose of this project is to demo the Vue + Apollo frontend tech stack.

### Setup instructions

Install `nodemon` to run the local api server:

```
npm install -g nodemon
```

Run api: 
```
cd posts-api
npm install
npm run start
```

Run app:

```
cd posts-app
npm install
npm run serve
```