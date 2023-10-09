# Ultimate Herb Finder

![Project Image](spices.png)

> A comprehensive Herb and Spice Finder Application built with the MERN Stack, allowing users to seamlessly search, match, and manage herbs and spices.

---

### Table of Contents

- [Description](#description)
- [Features](#features)
- [Technologies](#technologies)
- [Setup and Usage](#setup)
- [API References](#references)
- [License](#license)

---

## Description

"Ultimate Herb Finder" is a MERN Stack application that offers:

- Search: Find herbs and spices by name.
- Match: Pair herbs or spices with complementary foods or recipes.
- Manage: Add, update, or delete herbs and spices in the database.
- API Integration: Implements third-party API with rate limiting for fetching recipes.

## Features

- Herb Management: Add, update, and delete herbs.
- Recipe Finder: Match herbs with suitable recipes.
- User-Friendly UI: Intuitive and responsive design for a seamless user experience.
- Alerts: Informative alerts for user actions.

## Technologies

- React : v17.0.2
- Express: v4.17.1
- Mongoose: v6.0.10
- Node: v14.15.4
- CSS3

---

## Setup and Usage

#### 1. Install Server Dependencies:

`npm install`

#### 2. Install Client Dependences:

`npm run client-install`

#### 3. Run Client & Server Concurrently:

`npm run dev`

#### 4. Run Express Server Only:

`npm run server`

#### 5. Run React Client Only:

`npm run client`

#### Server runs on http://localhost:5000 and client on http://localhost:3000

---

## API References
For fetching recipes, the application uses the Edamame API. Ensure you have the necessary environment variables set up in the root .env file.

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

---

## License

This project is licensed under the [MIT License](#LICENSE.txt)

Copyright (c) 2021 [Amelia Hill](#https://ameliahill.com)

[Back To Top](#ultimate-herb-finder)
