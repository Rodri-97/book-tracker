## LitQuest

A book tracker web app to help you organize your readings.

## Features

- Search for books by title and/or author.
- User registration and authentication.
- Add books to personal library.
- Track books as “To Read”, “Currently Reading”, “Did Not Finish”, and “Read”.
- Rate and review books.

## Motivation

I’ve been using [Goodreads](https://www.goodreads.com/) for years and it certainly does the job, but I find its UI clunky at times. Namely because of the constant full-page reloads. That’s why I decided to create my own version that would have a snappier, more SPA-like feel.

Though I’m familiar with a variety of languages, I’m most comfortable with TypeScript, making it the obvious choice for this project. From there, I had two main options when it comes to the project’s architecture:

- Either build a standard single-page application that would fetch user data from a separate REST API. In this setting, there would be a strict separation of concerns between the frontend and the backend.

- Or use a full-stack framework to have a more cohesive codebase and remove repetition. At the cost of some flexibility (like the possibility to swap out or separately deploy the frontend or the backend, or write them in different languages) and of a tighter coupling of concerns.

I decided that the trade-offs of the second option were worth it. Because I wanted to write my backend in TypeScript anyway and I thought the first option would add a lot of unnecessary overhead in the context of this project. Additionally, this application requires some parts to be rendered on the server (namely the search feature, so even unauthenticated users can search for books), and going the standard SPA + separate REST API way would thus require me to run my application in two servers, instead of just one. That’s how I ended up picking the Next.js framework, for its full-stack capabilities and extensive community.

## Acknowledgements

- [The Next.js documentation](https://nextjs.org/docs)
- [The Google Books API guide](https://developers.google.com/books/docs/v1/using)
- [Lucia](https://lucia-auth.com/), an absolutely stellar authentication library.
- [shadcn/ui](https://ui.shadcn.com/), for providing many of the essential UI components.
- [This GitHub repository](https://github.com/gottumukkalakiran/Book-Hub), for the design inspiration.
- [Fly.io](https://fly.io/docs/js/frameworks/nextjs/), for making it very easy to dockerize and deploy this application.
- [Josh Tried Coding](https://www.youtube.com/@joshtriedcoding) and [Web Dev Simplified](https://www.youtube.com/@WebDevSimplified), two extremely helpful YouTube creators on anything related to the TypeScript and React/Node ecosystems.

## Installation

These are the instructions if you want to try out this project in your local development environment.

### Prerequisites

- [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [Local PostgreSQL database](https://www.docker.com/blog/how-to-use-the-postgres-docker-official-image/) (Docker isn't the only option here, but it's certainly one of the simplest.)

### Steps

1. **Clone the repository**

   ```sh
   git clone https://github.com/Rodri-97/book-tracker.git
   cd book-tracker
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Remove unneeded files and dependencies (optional)**\
   These files and dependencies are for deployment purposes only. So they're not needed if you just want to run the project locally or deploy it in a different manner.

   ```sh
   rm -rf Dockerfile .dockerignore fly.toml
   npm uninstall @flydotio/dockerfile
   ```

4. **Set up environment variables**\
   Create a `.env` file in the root directory and add this environment variable:

   ```plaintext
   DATABASE_URL=[your_database_url]
   ```

5. **Apply database migrations**

   ```sh
   npx prisma migrate dev
   ```

6. **Start the development server**
   ```sh
   npm run dev
   ```
