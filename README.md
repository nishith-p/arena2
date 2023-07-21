# Arena2

A better version of the bull-queue arena created using React and Express. This basically scraps data off the existing arena and adds some much needed features that were missing.

## Features

- Search queue records
- Remove duplicate records
- View unlimited records
- Export unlimited records
- Fetch custom number of records
- View stats of all queues at once

## How to Run?

It's not meant to be run.

You need a signed certificate to run this. Assuming you already have it, rename it to 'authCert.crt' and put it in the root folder.

Install node modules using npm, create .env files in both the root and client directories according to the .env.example files given. This already has 'concurrently' set up so just run the following command.

```
npm run dev
```

That's it.
