import superagent from 'superagent';

const METHODS = ['get', 'post', 'put', 'patch', 'del'];

// Create a promisified superagent to use in our stores
class ApiClient {
  constructor() {
    METHODS.forEach((method) => {
      this[method] = (url, options = {}) => {
        return new Promise((resolve, reject) => {
          let request = superagent[method](url);

          if (options.params) {
            request.query(options.params);
          }

          if (options.data) {
            request.send(options.data);
          }

          const onEnd = (err, res) => {
            if (err) {
              reject(res.body || err);
            } else {
              resolve(res.body);
            }
          };

          request.end(onEnd);
        });
      };
    });
  }
}

export default ApiClient;
