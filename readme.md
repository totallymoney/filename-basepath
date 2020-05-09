# Filename Basepath

Mount express routes using filename as basepath.

Useful for efficiently mocking multiple http dependencies.

## Example

```bash
$ yarn add -D @totallymoney/filename-basepath
```

```bash
$ tree
.
├── mocks
│   └── my-route.js
└── package.json
```

```bash
$ cat mocks/my-route.js

var router = require("express").Router();

router.get("/foo", function (_, res) {
  res.send("bar");
});

module.exports = router;
```

```bash
$ yarn filename-basepath mocks

Sourcing routes from: my-repo/mocks
/my-route
Running on port 3000
```

```bash
$ curl -s http://localhost:3000/my-route/foo

"bar"
```
