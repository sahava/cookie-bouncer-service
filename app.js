const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(cookieParser());
app.use(express.json());

// Add all the hosts that have been mapped to the endpoint
const allowedHosts = [
  'https://www.simoahava.com'
];

const corsOptions = {
  origin: (origin, cb) => {
    if (allowedHosts.indexOf(origin) > -1) {
      cb(null, true);
    } else {
      cb(new Error('CORS error!'));
    }
  },
  methods: 'POST',
  credentials: true
};

app.options('/', cors(corsOptions));

app.post('/', cors(corsOptions), (req, res, next) => {
  const msg = req.body;
  const cookies = Array.isArray(msg) ? msg : [msg];
  const hasSet = [];
  cookies.forEach(c => {
    if (typeof c !== 'object') return;
    if (!c.hasOwnProperty('name') || !c.hasOwnProperty('value')) {
      return;
    }
    hasSet.push(c.name);
    res.cookie(c.name, c.value, c.options);
  });

  res.status(200).json({msg: `Processed cookies: ${hasSet}`});
});

const PORT = process.env.PORT || '8080';
/* istanbul ignore next */
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}

module.exports = app;
