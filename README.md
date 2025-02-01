# Accommodation Search

## Technical Coding Test

This project has a simple setup with an api, hooked up to MongoDB and a frontend piece initiated with [vite](https://vitejs.dev/).

## Install and run

From the project root:

```
npm install
```

### Run

Once install has finished, you can use the following to run both the API and UI:

```
npm run start
```

### API

To run the API separately, navigate to the `./packages/api` folder

```
$ cd packages/api
```

And run the `api` server with

```
$ npm run dev
```

The API should start at http://localhost:3001

### Client

To run the `client` server separately, navigate to the `./packages/client` folder

```
$ cd ./packages/client
```

And run the `client` with

```
$ npm run start
```

The UI should start at http://localhost:3000

### Database connection & environment variables

By default, the code is set up to start and seed a MongoDB in-memory server, which should be sufficient for the test. The database URL will be logged on startup, and the seed data can be found at ./packages/api/db/seeds.

If this setup does not work for you or if you prefer to use your own MongoDB server, you can create a .env file. In the ./packages/api folder, create a .env file (or rename the existing .env.sample) and fill in the environment variables.

## Task at hand

When the project is up and running, you should see a search-bar on the screen. This one is currently hooked up to the `/hotels` endpoint.
When you type in a partial string that is part of the name of the hotel, it should appear on the screen.
Ie. type in `resort` and you should see some Hotels where the word `resort` is present.

You will also see 2 headings called **"Countries"** and **"Cities"**.

The assignment is to build a performant way to search for Hotels, Cities or Countries.
Partial searches will be fine. Hotels will need to filterable by location as well.
Ie. The search `uni` should render

- Hotels that are located in the United States, United Kingdom or have the word `uni` in the hotel name.
- Countries that have `uni` in their name Ie. United States, United Kingdom
- No Cities as there is no match

Clicking the close button within the search field should clear out the field and results.

When clicking on one of the `Hotels`, `Cities` or `Countries` links, the application should redirect to the relevant page and render the selected `Hotel`, `City` or `Country` as a heading.

### Limitations

Given the time constraints, we do not expect a fully production-ready solution. We're primarily interested in the approach and the overall quality of the solution. 
Feel free to modify the current codebase as needed, including adding or removing dependencies. 
For larger or more time-intensive changes, you're welcome to outline your ideas in the write-up section below and discuss them further during the call.

<img src="./assets/search-example.png" width="400px" />

### Write-up

<!-- Write-up/conclusion section -->

**API**
- *Utils Module:* Created a separate module for all the types, interfaces, and schemas. Also, added Zod for validating those schemas. 
- *SRR*: By using Single Responsibility Principle and Separation of Concern methodology, created separate Controllers, Services and Routes for the Entities of the application.
- *KISS*: Used the widely known KISS(Keep It Simple, Stupid) design principle of Software Development by writing minimilistic code for what's needed. 
- *YAGNI*: Used another Software Development Principle called YAGNI(You Ain't Gonna Need It) by not over-complicating the solution, but following the functional requirements as provided. 
- *Folder Structure:* Improved folder structure of the entire API and used express package in its true capacity. 
- *View All Feature:* Allowed user to view 5 items in the search bar and use "View all" button to view an extended version of the search. 

**CLIENT**
- *Debounced Search:* Implemented a debounced search that takes 1000ms after the last key-stroke to begin search. It is to ensure that we are not hammering the database with useless queries. 
- *TryHackMe Theme:* Used TryHackMe's search as an inspiration and updated the application's theme. 
- *Folder Structure:* Improved folder structure by creating Pure Components for Hotels, Countries, and Cities. 
- *Tailwind CSS:* Removed the conventional CDN for Bootstrap and added TailwindCSS to utilize its *tree-shaking* method to minimize the CSS load of the application. 
- *Update Deps:* Updated node dependencies with latest version to enhance this application's life.  

**Improvements**
- *Rate Limiting:* Implement the *rate-limiting middleware* in the backend to ensure that the search field is not abused. 
- *Database Normalization:* 
  - Store *countries._id* in *hotels* collection instead of *hotels.country* and *hotels.countryisocode*.
  - Store *cities._id* in *hotels* collection instead of *city*.
  - Separate collection for *chain_name* as a single chain_name can belong to multiple hotels. This way we can save the *chain_name._id* in *hotels* collection instead of the *chain_name::string*. 
- *State Lift-Up:* When navigating back to the home page, search results disappear. Lifting up the state will ensure that the search string and the list will be saved.

### Database structure

#### Hotels Collection

```json
[
  {
    "chain_name": "Samed Resorts Group",
    "hotel_name": "Sai Kaew Beach Resort",
    "addressline1": "8/1 Moo 4 Tumbon Phe Muang",
    "addressline2": "",
    "zipcode": "21160",
    "city": "Koh Samet",
    "state": "Rayong",
    "country": "Thailand",
    "countryisocode": "TH",
    "star_rating": 4
  },
  {
    /* ... */
  }
]
```

#### Cities Collection

```json
[
  { "name": "Auckland" },
  {
    /* ... */
  }
]
```

#### Countries Collection

```json
[
  {
    "country": "Belgium",
    "countryisocode": "BE"
  },
  {
    /* ... */
  }
]
```
