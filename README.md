# Quiz App with service worker

This project is a Progressive Web App (PWA) built with React. It leverages service workers to enhance the user experience by providing offline capabilities, handling unfinished quizzes, and managing rate limits.
## Features
### Offline Handling
As a PWA, the Quiz App can function offline once it has been installed. This means that users can access the app and its cached content even without an internet connection, providing a seamless experience. The service worker caches essential assets and quiz data, ensuring that the app remains usable and responsive even when offline.

### Handling Unfinished Quizzes

The service worker ensures that the quiz data is cached and can be accessed even if the user leaves the page or goes offline. This is achieved through the following mechanisms:

1. **Caching Quiz Data**: When the quiz data is fetched from the endpoint, it is cached by the service worker. This allows the application to retrieve the quiz data from the cache if the user returns to the quiz later, ensuring that the quiz state is preserved.

2. **Clearing Cache on Quiz Completion**: The service worker listens for a "clear-cache" message event. When the quiz is completed, the application can send a message to the service worker to clear the cache. This ensures that the cached quiz data is removed, preventing stale data from being used in future quizzes.

### Managing Rate Limits (Error 429 "Too Many Requests")

The endpoint gives the error if a request is made within a short period (5 sec).
The service worker helps manage rate limits by caching the quiz data and serving it from the cache if the quiz is unresolved. This reduces the number of requests sent to the endpoint, helping to avoid hitting the rate limit.

1. **Cache-First Strategy**: The service worker uses a cache-first strategy, where it first checks if the requested resource is available in the cache. If it is, the cached response is returned, reducing the need to make frequent network requests.

2. **Handling Network Requests**: If the resource is not in the cache, the service worker fetches it from the network and caches the response. This ensures that subsequent requests within a short period can be served from the cache, reducing the likelihood of hitting the rate limit.

### Detailed Explanation

#### Caching Quiz Data

When the quiz data is fetched, the service worker caches the response:

```javascript
return fetch(event.request).then(response => {
  if (response.ok) {
    return caches.open("quiz").then(cache => {
      cache.put(event.request.url, response.clone());
      return response;
    });
  } else {
    return response;
  }
});
```

This ensures that the quiz data is stored in the cache and can be retrieved later if needed.

#### Clearing Cache on Quiz Completion

The service worker listens for a "clear-cache" message event and deletes the "quiz" cache when the message is received:

```javascript
self.addEventListener("message", event => {
  if (event.data && event.data.action === "clear-cache") {
    console.log("Service Worker: Clearing cache");
    caches.delete("quiz");
  }
});
```
#### Managing Rate Limits
By using a cache-first strategy, the service worker reduces the number of network requests:

```javascript
event.respondWith(
  caches.match(event.request).then(cachedResponse => {
    if (cachedResponse) {
      return cachedResponse;
    }

    return fetch(event.request).then(response => {
      if (response.ok) {
        return caches.open("quiz").then(cache => {
          cache.put(event.request.url, response.clone());
          return response;
        });
      } else {
        return response;
      }
    });
  }).catch(error => {
    console.error("Service Worker: Fetch failed", error);
    return fetch(event.request);
  })
);
```
This ensures that if the quiz data is already cached, it is served from the cache, reducing the need to make frequent network requests and helping to avoid hitting the rate limit.

### Summary
- Handling Unfinished Quizzes: The service worker caches the quiz data, allowing the application to retrieve it later if the user returns to the quiz. The cache is cleared when the quiz is completed to prevent stale data from being used.
- Managing Rate Limits: The service worker uses a cache-first strategy to reduce the number of network requests, helping to avoid hitting the rate limit imposed by the endpoint. If the data is already cached, it is served from the cache, reducing the need for frequent network requests.
- Offline Handling: If the user is offline and the resource is not in the cache, a fallback response is returned. As a Progressive Web App (PWA), the application will continue to work offline if it has been installed once. This means that users can access the app and its cached content even without an internet connection, providing a seamless experience.


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
