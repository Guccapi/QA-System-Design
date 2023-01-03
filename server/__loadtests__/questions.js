import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  stages: [
    { duration: '2m', target: 100 },
    { duration: '5m', target: 100 },
    { duration: '2m', target: 500 },
    { duration: '5m', target: 500 },
    { duration: '2m', target: 1000 },
    { duration: '5m', target: 1000 },
    { duration: '10m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<50'],
  },
};

const serviceEndpoint = 'http://localhost:8080/qa';

export default () => {
  http.batch([
    ['GET', `${serviceEndpoint}/questions?product_id=${1}&page=1&count=50`],
    [
      'GET',
      `${serviceEndpoint}/questions?product_id=${500000}&page=1&count=50`,
    ],
    [
      'GET',
      `${serviceEndpoint}/questions?product_id=${3518966}&page=1&count=50`,
    ],
  ]);

  sleep(1);
};

// import http from 'k6/http';
// import { check, sleep } from 'k6';
// import { Counter } from 'k6/metrics';

// const ErrorCount = new Counter('errors');

// 1k RPS each route
// Measure RPS, Latency, and Error Rate for each request.

// export const options = {
//   scenarios: {
//     constant_request_rate: {
//       executor: 'constant-arrival-rate',
//       rate: 1000,
//       timeUnit: '1s', // 1000 iterations per second, i.e. 1000 RPS
//       duration: '15s',
//       preAllocatedVUs: 20, // how large the initial pool of VUs would be
//       maxVUs: 50, // if the preAllocatedVUs are not enough, we can initialize more
//     },
//   },
// };

// export const options = {
//   insecureSkipTLSVerify: true,
//   noConnectionReuse: false,
//   stages: [{ duration: '30s', target: 1000 }],
//   thresholds: {
//     http_req_failed: ['rate<0.01'],
//     http_req_duration: ['p(100)<3000'],
//   },
// };

// export default function test() {
//   const res = http.get('http://localhost:8080/qa/questions/1');
//   const success = check(res, {
//     'status is 200': (r) => r.status === 200,
//   });
//   if (!success) {
//     ErrorCount.add(1);
//   }
// }
