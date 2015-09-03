
# bare-auth-facebook

  Facebook authentication with [Bare Auth](https://github.com/lapwinglabs/bare-auth).

## Installation

```
npm install bare-auth-facebook
```

## Setup

##### 1. Create an App

Go to: https://developers.facebook.com/apps to get started

##### 2. Add a valid Redirect URI

- Go to: https://developers.facebook.com/apps/{{APP_ID}}/settings/advanced/
- Add a URL with the following format: `{{ORIGIN}}/auth/`. Example: `http://localhost:7000/auth/` or `https://app.finbox.io/auth`

> **Important:** Don't forget to add the trailing slash as part of the valid redirect URI. Facebook will fail silently and you won't know why.

##### 3. Setup the client-side

```js
var Facebook = require('facebook-bare-auth');
var facebook = Facebook({
  url: 'http://auth.example.com'
  client_id: facebook_client_id,
  scope: ['profile']
})

facebook(function(err, profile) {
  if (err) throw err;
  console.log(profile);
});
```

> **Important:** `url` points to the domain of your auth server (server-side below). The routing will be set up for you

##### 4. Setup the server-side (example uses Express)

```js
var Facebook = require('facebook-bare-auth');
var bodyParser = require('body-parser');
var express = require('express');
var cors = require('cors');

var app = module.exports = express();

app.use(cors());
app.use(bodyParser.json());

app.use(Facebook({
  client_secret: client_secret
  // optionally include a 'sign' function to add support for JWT
}));

app.listen(5000);
```

## License

MIT

Copyright (c) 2015 Matthew Mueller &lt;matt@lapwinglabs.com&gt;
