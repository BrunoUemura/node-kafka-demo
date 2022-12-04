# Node.js Kafka Demo
An asynchronous communication example.

## How to run
- Run `docker-compose up -d` to start Kafka and Zookeeper.

- Install the dependencies for both `service-one` and `service-two` using command:
  - using npm
  ```bash
  npm install
  ```
  - Using yarn
  ```bash
  yarn install
  ```
  - Using pnpm
  ```bash
  pnpm install
  ```
 
- Run both `service-one` and `service-two` using command:
  - using npm
  ```bash
  npm start
  ```
  - Using yarn
  ```bash
  yarn start
  ```
  - Using pnpm
  ```bash
  pnpm start
  ```

- Send a `POST` request to `http://localhost:3000/produce` with any data body:
```bash
curl --request POST \
  --url http://localhost:3000/produce \
  --header 'Content-Type: application/json' \
  --data '{
	"message": "Hello, World!"
}'
```
