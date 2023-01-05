const cluster = require('node:cluster');
const { cpus } = require('node:os');
const process = require('node:process');
const app = require('.');

const numCPUs = cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} running`);

  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  app.listen(app.get('port'), () => {
    console.log(
      `Worker ${process.pid} running on http://localhost:${app.get('port')}`,
    );
  });
}
