// Entry point for server-side app
import path from 'path';
import Express from 'express';
import sstatic from 'serve-static';
import config from '../config';

import mainServerRoute from './mainRoute';

// Create a really basic Express server
const app = new Express();

// We use Express as just a basic server with one 'route' that handles all requests.
// We then use universalRouter to handle all the routing
app.get('/favicon.ico', (req, res) => {
  res.status(404).send('Not Found');
});

app.use(sstatic(path.join(__dirname, '..', 'static')));

app.use(mainServerRoute);

if (!config.port) {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}

app.listen(config.port, (err) => {
  if (err) {
    return console.error(err);
  }

  console.info('==> ✅  Server is listening');
  console.info(`==> 🌎  ${config.app.name} running on port ${config.port}`);
});
