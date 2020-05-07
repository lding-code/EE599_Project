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

The homepage consists of a list of problems.

![homepage view](screenshots/homepage.png?raw=true "homepage view")

Upon clicking those problems, they will expand and show problem descriptions with three buttons: like, hate, solve as shown below:

![home page expanded](screenshots/homepage-expanded.png?raw=true "homepage expaneded")

Clicking like or hate will change the corresponding count. Clicking solve will redirect to the solve-problem page of the respective problem.

**Solve-Problem view:**

The solve-problem page consistts of two panels: Problem details on the left and a code editor on the right. Clicking the "Submit Code" button to submit code typed in the code editor. After a few seconds (takes longer for the first submission because the test suite takes time to startup), the result will show up.

![solve problem page](screenshots/solve-problem.png?raw=true "solve problem page")

If we click submit code button right now, a "Build Failed" warning sign will show up because the code is not completed (syntax error):

![solve problem with build fail](screenshots/solve-problem-build-fail.png?raw=true "solve problem page with build fail")

If we fix the syntax error and return the required content with mistake (omission of exclamation mark), a "build complete, test failed" warning sign will show up:

![solve problem with test fail](screenshots/solve-problem-test-fail.png?raw=true "solve problem with test fail")

If we have a perfect code and submit it, a "test passed" message will show up:

![solve problem with test pass](screenshots/solve-problem-test-pass.png?raw=true "solve problem with test pass")

**Add-Problem view:**

If we click the "Add Problem!" button on the top right corner, the page will redirect to add-problem view where user will enter problem title, problem description and provide starter code and test code, which tests the submitted code. The server will execute test code and return results:

![add problem](screenshots/add-problem.png?raw=true "add problem")

The user could also provide a sample solution to test the correctness of the tester code at the bottom. By clicking "test" button, the server will compile the tester code and sample solution code and return test results. Same message will show up here as what shows up in solve-problem view. This is not mandatory as some user may not know the solution to the problem. Whether the sample solution is provided or not, users can submit the problem by clicking "submit problem" button.

![add problem sample solution](screenshots/add-problem-down.png?raw=true "add problem sample solution")

Example of a bad sample solution test (syntax error: omission of ";"):

![add problem bad sample solution](screenshots/add-problem-fail.png?raw=true "add problem bad sample solution")

## Implementation details

**Backend structure:**

server.js (the basic js file that handles server connectivities, this is what is called to start the server)

app.js (used by server.js to implement business logics like database cleaning and http route handling)

api (routes folder containign different routing files used by app.js. They are separated for a more modular development approach)

api/probadd.js (route file responsible for adding problems. it responds to request from frontend and stores data in mongoDB database using mongoose library)

api/problist.js (route file responsible for reteiving problem data from mongoDB database and send to frontend)

api/probsolve.js (route file responsible for receiving problem data and submitted code fromfront end and testing the submitted code using child-process library which allows for executing command line and listening for output)

models (data structure folder that sores data sreuctures used in the backend)

models/prob.js (data structure/schema used for problem data for mongoose use)

temp (temp code folder used by the server to test the submitted code)

temp/src/solution.h (submitted code is converted to solution.h for test)

temp/test/test.cc (the tester code is converted to test.cc for test)

temp/temp test.js (testing file used to test functionality of child_process which is the core funcitonality of the backend)*

**Frontend structure:**

The frontend is splitted into three major components on top of the basic app component: prob-add, prob-list, prob-solve for rendering "add problem", "homepage", "solve problem" views.

*Folders and files not mentioned here are auto-generated by the angular project generator.

src/fonts (folder that stores font used in the code editor)

src/custom-theme.scss (style template used to define custom theme color)

src/app/app.module.ts (the basic core file that is being called when constructing the webpage view. Every component and module used are dewclared here)

src/app/app-routing.module.ts (the routing file that decides which component is used to render the page)

src/app/prob/prob.model.ts (model file that defines data structure used in data transaction between different component inside angular)

src/app/prob/prob.service.ts (core service file that provides data transaction between components and sends/receives http requests/responses to/from backend server)

src/app/navbar/ (navbar component folder that contains essential files for rendering navigation bar: navbar.component.css for styling, navbar.component.html for page content, navbar.component.ts for logic/control

src/app/prob/prob-add (prob-add component folder that contains essential files for rendering "add problem" page: prob-add.component.css for styling, prob-add.component.html for page content, prob-add.ts for logic/control)

src/app/prob/prob-list (prob-list component folder that contains essential files for rendering "homepage" view: prob-list.component.css for styling, prob-list.component.html for page content, prob-list.ts for logic/control)

src/app/prob/prob-solve (prob-solve component folder that contains essential files for rendering "solve problem" page: prob-solve.component.css for styling, prob-solve.component.html for page content, prob-solve.ts for logic/control)

**Please refer to project presentation.pptx for visualized frontend and backend structures**
