# Shelf

Formerly Bookr. Visit https://shelf.fly.dev for a demo!

### Tools and designs

#### Tools

- [Vite/React](https://vitejs.dev/guide/)
- [Chakra UI](https://chakra-ui.com/guides/getting-started/vite-guide)
- [React Router](https://reactrouter.com/docs/en/v6/getting-started/tutorial)
- [Axios](https://axios-http.com/docs/intro)
- [Google Books API](https://developers.google.com/books/docs/v1/getting_started)
- [Express](https://expressjs.com/)

When switching between deploy-staging and main, append `http://localhost:5000` to the front of any instances of client-side server calls when you're on main, and remove them when you're on deploy-staging.

Run `nodemon server` from the root directory to start the server, and in another terminal instance run `npm run dev` for development.
