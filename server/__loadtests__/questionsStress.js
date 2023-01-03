import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter } from 'k6/metrics';

export let options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  stages: [
    { duration: '2m', target: 100 },
    { duration: '2m', target: 500 },
    { duration: '5m', target: 500 },
    { duration: '2m', target: 1000 },
    { duration: '5m', target: 1000 },
    { duration: '2m', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(100)<3000'],
  },
};

const URL = 'http://localhost:8080/qa/questions';

export default () => {
  http.batch([
    ['GET', `${URL}?product_id=${1}&page=1&count=50`],
    ['GET', `${URL}?product_id=${252343}&page=1&count=50`],
    ['GET', `${URL}?product_id=${3403943}&page=1&count=50`],
  ]);
  sleep(1);
};
