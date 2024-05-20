## LitQuest

## Description

A book tracker web app to help you keep track of your readings.

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

- Or use a full-stack framework to have a more cohesive codebase and remove repetition. At the cost of some flexibility (like the possibility to swap out or separately deploy the frontend or the backend) and of a tighter coupling of concerns.

I decided that the trade-offs of the second option were worth it. Because I wanted to write my backend in TypeScript anyway and I thought the first option would just add a lot of unnecessary overhead in the context of this project. Additionally, this application requires some parts to be rendered on the server (namely the search feature, so even unauthenticated users can search for books), and going the standard SPA + separate REST API way would thus require me to run my application in two servers, instead of just one. That’s how I ended up picking the Next.js framework, for its full-stack capabilities and extensive community.

## Acknowledgements

- [The Next.js documentation](https://nextjs.org/docs)
- [The Google Books API guide](https://developers.google.com/books/docs/v1/using)
- [Lucia](https://lucia-auth.com/), an absolutely stellar authentication library.
- [shadcn/ui](https://ui.shadcn.com/), for providing many of the essential UI components.
- [This GitHub repository](https://github.com/gottumukkalakiran/Book-Hub), for the design inspiration.
- [Fly.io](https://fly.io/docs/js/frameworks/nextjs/), for making it very easy to dockerize and deploy this application.
- [Josh Tried Coding](https://www.youtube.com/@joshtriedcoding/videos) and [Web Dev Simplified](https://www.youtube.com/@WebDevSimplified), two extremely helpful YouTube creators on anything related to the TypeScript and React/Node ecosystems.
