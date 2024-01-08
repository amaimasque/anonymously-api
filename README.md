## Description

API for [anonymously-app](https://github.com/amaimasque/anonymously-app). Made with Node.js, Express.js & PostreSQL.


API collection can be accessed [here](https://www.postman.com/mission-geoscientist-85089642/workspace/ami-s-public-apis/collection/31191383-f8a87af9-ee2d-45a8-8342-66421afd5187?action=share&creator=31191383).

## TODO

- [ ]   Notfications - Firebase cloud messaging integration
- [ ]   Insights API
	- GET /insights 
	- POST /insight
- [ ]   Notifications API

## Run Locally

Clone the project

```bash
  git clone https://github.com/amaimasque/anonymously-api.git
```

Go to the project directory

```bash
  cd anonymously-api
```

Install dependencies

```bash
  npm install
```

Create `.env` file and copy contents from `env` file. Change `DATABASE_URL` according to database credentials.

Run the following commands for database migration and seed:

```bash
  npm run db:migrate
  npm run db:seed
```

Start the app

```bash
  npm start
```

NOTE: You may use seed accounts from `prisma/seed.js` to login.
