# bookenzy

bookenzy is a Node.js application for user authentication and management using JWT (JSON Web Tokens). Built with TypeScript and Express, it allows users to securely register and log in.

## Features

- User registration with unique email and username
- JWT-based authentication
- Password hashing with bcrypt

## Tech Stack

- **Node.js**
- **Express**
- **TypeScript**
- **PostgreSQL**
- **JWT**
- **bcrypt**
- **dotenv**

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/bookenzy.git
   cd bookenzy
   ```
2. Install dependencies:

```bash
Copy code
npm install
```

3. Set up a .env file:

```bash
BOOKENZY_JWT_SECRET=your_secret_key
DATABASE_URL=your_database_connection_string
```

4. Start the server:

```bash
npm run dev
```

## API Endpoints

- **POST /v1/register** - Register a new user
- **POST /v1/login** - Log in a user

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.
