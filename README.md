This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment variables
To use `supabase`, we need some environment variables, please copy existing `.env.example` file to `.env.local` then update those environment variable as needed.
```bash
cp .env.example .env.local
```

## Project Folder Structure
I have modified the folder structure as the following:
- Under the `/src` folder are all our codes.
- `/api` folder contains all code we need to access the APIs of our application. For each API,we could have one folde where we could have API files and the test file. 
- `/components` folder contains the frontend code that we need to build the application. It has serval sub folders:
    - `/elements` folder contains all the basic building blocks of the app, for example, a `button` or `a` tag, or `nav` element. Components here are often reused and shared by different modules. 
    - `/modules` inlcudes components that are not basic building blocks, for instance the `accountCreation` module would contain signup and signin forms, email validation component, a button component from the `/elements`.
    - `templates` contains all the templates for the project, for instance, a signup page tempalte that can be used for both customer and farmer signup, a single prodduct display template that can be used in various pages. 
    - `/layouts` are used to wrap the templates. For instance, we could include footer and header in the default layout.
-`/tests` folder is where we could have integration tests(to test a module) and maybe end-to-end testing.
-`/utils` folder has functions that we will call again and again in the project, for example, a date time parser.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
