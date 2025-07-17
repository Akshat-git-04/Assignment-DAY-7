// src/features/audit/auditMiddleware.js
const auditMiddleware = store => next => action => {
  if (!action.type.includes('persist/')) {
    console.log('[AUDIT]', action.type, action.payload);
  }
  return next(action);
};

export default auditMiddleware;
