var express = require('express');
var router = express.Router();

/* GET home page. */
let dummy = {
  "id": 4,
  "quote" "ARG semangaatttt"
}

router.get('/', function(req, res, next) {
  res.send(dummy);
});

module.exports = router;
