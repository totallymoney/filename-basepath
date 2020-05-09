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

## Development

Make sure you belong to the [totallymoney](https://www.npmjs.com/settings/totallymoney/packages) npm organization. Then make changes to the source code and publish. Enter the new version number as prompted. A git push command will run automatically after publishing.

```bash
$ git commit -am "Improve logging"
$ yarn publish --access public
```
