# Questions & Answers API

<a name="general-info"></a>

### General Info

- This project serves as the backend design for Project Atelier, an e-commerce company.
- This server handles the Questions & Answers of the individual products.
- An ETL process was used to parse millions of rows of data and optimize the schema.
- The database was created with PostgreSQL.
- Load balancing and Caching was implemented utilizing Nginx.

<a name="performance"></a>

### Perfomance

Back End Architecture utilizes AWS to deploy a load balancer with a cache, 4 servers, and a Postgres database. All load tests performed via Loader.io.

<details>
  <summary>Typical Load Performance</summary>

Perfomance at typical load of 1000 clients per second. 1ms latency and 0% error rate.

#### Typical 1000 RPS Load

![1000 RPS Performance](assets/QuestionAvgLoad.png)

</details>

<a name="optimization"></a>

### Optimization

<details><summary>Cache Implementation</summary>

Cache and load balancer implemented using Nginx - Latency increased to 7ms, but was able to push performance and be able to handle 10,000 rps. Through a cached implementation and proper load balancing, the server was able to maintain a 0% error rate.

#### Performance Metrics

![10000 RPS Performance](assets/QuestionStressLoad.png)

</details>

<a name="tech"></a>

### Tech Stack

![node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white) <br />

<a name="team"></a>
Questions & Answers: Mo Akbari\
[![Linkedin: LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/akbarimo/)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/akbarimo)
