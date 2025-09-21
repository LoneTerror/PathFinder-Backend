# PathFinder Main Backend

# Steps to run the backend

# 1. Database Setup

You need to have postgresql installed, then only you can proceed with the following steps!

- Step 1: Create a `.env` file inside backend folder (use the below format)

ENV FORMAT:


```
DATABASE_URL="postgresql://user_name:password@localhost:5432/db_name?schema=public"
JWT_SECRET="key_here"
SERVER_PORT=<PORT_HERE>
```


- Step 2: In `DATABASE_URL` here:

-- The `user_name` is your -> Postgresql Username (default is `postgres`)

-- `password` is the password you use to login, 

-- `5432` is the port on which postgresql service is running (default is same)

-- `db_name` is the database name, in this case create a database named ```pathfinder``` in your postgresql database


- Step 3: Install Dependencies:

  Use this command to install the dependencies:

```
cd backend
npm install
```


# 2. Prisma Setup


- a. Prisma Generation: 


Generate the prisma file using the command: 
```
npx prisma generate
```


- b. Prisma Migrate: (Initializes the database & creates tables alongwith columns automatically)


Run the migration command: 
```
npx prisma migrate dev
```


- c. Prisma Seed: (Seeds the values inside the table from the folder `seed.ts`)


Run the seeding command: 
```
npx prisma db seed
```


# 3. Finally Run the backend


```
npm run dev
```
