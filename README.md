# Ultimate Herb Finder

![Project Image](spices.png)

> Herb and Spice Finder Application built with the MERN Stack.

---

### Table of Contents

- [Description](#description)
- [How To Use](#how-to-use)
- [API References](#references)
- [License](#license)

---

## Description

This Application allows a user to search for an herb or spice by name and to match that particular herb or spice with a complentary food or recipe. The MERN Stack version of this applicaction also contains the functionality to add, update and/or delete an herb or spice from the database.

#### Technologies

- React : v17.0.2
- Express: v4.17.1
- Mongoose: v6.0.10
- Node: v14.15.4
- CSS3

---

## How To Use

#### Install dependencies for server

`npm install`

#### Install dependencies for client

`npm run client-install`

#### Run the client & server with concurrently

`npm run dev`

#### Run the Express server only

`npm run server`

#### Run the React client only

`npm run client`

#### Server runs on http://localhost:5000 and client on http://localhost:3000

---

## API References

To fetch recipes from the Edamame API, create variables in the root .env file:

```
API_BASE_URL = https://api.edamam.com/search
API_ID_VALUE = "Your Access ID"
API_KEY_VALUE = "Your API Key"
```

In the recipes.js route:

```
try {
        const params = new URLSearchParams({
            app_id:  process.env.API_ID_VALUE,
            app_key: process.env.API_KEY_VALUE,
            ...url.parse(req.url, true).query
        });

       const apiRes = await needle('get', `${process.env.API_BASE_URL}?${params}`)
}

```

[Back To Top](#ultimate-herb-finder)

---

## License

This project is licensed under the [MIT License](#LICENSE.txt)

Copyright (c) 2021 [Amelia Hill](#https://ameliahill.com)
