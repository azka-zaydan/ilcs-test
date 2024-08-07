# Task API

## Overview

The Task API provides functionalities to update, get, delete, and retrieve tasks by ID. It also supports retrieving all tasks and includes caching for recently fetched tasks. The repository includes a `docker-compose` file to set up a local Oracle database and Redis instance for development and testing purposes. Unit testing is implemented using Mocha.

## Features

- **Update Task**: Update the details of a task.
- **Get Task**: Retrieve task details.
- **Delete Task**: Remove a task from the database.
- **Get Task by ID**: Fetch task details by its ID.
- **Get All Tasks**: Retrieve all tasks.
- **Caching**: Caching for recently fetched tasks to improve performance.
- **Unit Testing**: Comprehensive unit tests using Mocha.

## Setup

### Prerequisites

- Docker and Docker Compose installed on your machine.
- Node.js and npm installed on your machine.

### Steps

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/your-repo-name.git
    cd your-repo-name
    ```

2. **Copy the example environment file**:
    ```bash
    cp .env.example .env
    ```

3. **Update the `.env` file**:
    - Ensure that all the required environment variables are set in the `.env` file.

4. **Install dependencies**:
    ```bash
    npm install
    ```

5. **Run Docker Compose**:
    - Spin up the local Oracle database and Redis instances:
    ```bash
    npm run docker
    ```

6. **Run the application**:
    ```bash
    npm run dev
    ```

7. **Run unit tests**:
    ```bash
    npm run test-dev
    ```

## API Endpoints

- **Update Task**: `PUT /v1/tasks/:id`
- **Get Task**: `GET /v1/tasks`
- **Delete Task**: `DELETE /v1/tasks/:id`
- **Get Task by ID**: `GET /v1/tasks/:id`
- **Get All Tasks**: `GET /v1/tasks`

## Caching

The API includes caching for recently fetched tasks using Redis. This improves performance by reducing the number of database queries for frequently accessed data.

## Docker Compose

The repository includes a `docker-compose.yml` file that sets up:

- An Oracle database instance
- A Redis instance

here's a link for the tutorial on how to setup the oracle database [link](https://medium.com/@bastian.ohm/how-to-run-oracle-db-in-docker-6990780d4cac)

Run the following command to start the services:

```bash
npm run docker
```

## Unit Testing

Unit tests are implemented using Mocha. To run the tests, use the following command:

```bash
npm run test-dev
```

## Contributing

Contributions are welcome! Please create an issue or submit a pull request for any improvements or bug fixes.

## Note

If given more time, this project could be significantly improved. We can standardize how to handle database connections, how we interact with models, responses, failures, and much more.
