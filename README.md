## Demo

Live at [https://steam-games-viewer.felixsebastian.dev/](https://steam-games-viewer.felixsebastian.dev/aHR0cHM6Ly9zdGVhbWNvbW11bml0eS5jb20vcHJvZmlsZXMvNzY1NjExOTc5NjA0MzQ2MjI%3D)

## Getting Started

Install packages:

```bash
npm install
```

And start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Considerations

## Stateless server

It would be nice to store the responses from steam so that we're not hammering the steam API too much and to reduce latency. In the current implementation, the server is just a stateless serverless function, so we would need to spin up a database or cache to store responses.

I could have paginated the responses server-side to save bandwidth between the server and client, but this would create other problems because we'd be hitting the steam API once for each page. There is a branch `pagination` which starts down this road.

An alternative to caching would be to store all the steam IDs and run a chron job to keep data up to date. But I think it makes more sense to use a read-through caching approach.

## UX

I would have liked to implement a better loading state including skeleton cards.

There is also a case when an account is brand new and has no games, no play time or anything. In this case it would be nice to render a message and maybe an illustration.

I could have implented pagination in the browser, but I'm more inclined to figure what the ideal solution is. Such as described above.

## Failure states

The steam API doesn't seem to give us much useful error information. The main reason calls to steam would fail is if the steam ID is incorrect, but we don't really know for sure.

The error boundary is also very bare bones and could be improved so that if there's a bug in the frontend somewhere at least we can show a nice message.

## Suggested titles

A really cool feature to add to this would be a suggestion engine. We already know which games the user loves to play the most, and we could integrate with open AI to suggest similar games.

## About this repo

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Components in `app/components/ui` were generated with [Shadcn](https://ui.shadcn.com/).
