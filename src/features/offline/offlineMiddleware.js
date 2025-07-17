// src/features/offline/offlineMiddleware.js
const queue = [];

const offlineMiddleware = store => next => action => {
  if (!navigator.onLine) {
    queue.push(action);
    console.warn('[OFFLINE] Queued action:', action.type);
    return;
  }

  while (queue.length) {
    store.dispatch(queue.shift());
  }

  return next(action);
};

export default offlineMiddleware;
