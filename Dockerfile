# ---------- FRONTEND BUILD ----------
FROM node:18 AS frontend-build
WORKDIR /app/frontend
COPY frontend/frontend/package*.json ./
RUN npm install
COPY frontend/frontend ./
RUN npm run build

# ---------- BACKEND BUILD ----------
FROM node:18 AS backend-build
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend ./

# ---------- FINAL IMAGE ----------
FROM node:18
WORKDIR /app

# Copy backend
COPY --from=backend-build /app/backend ./backend

# Copy frontend build into backend public folder
COPY --from=frontend-build /app/frontend/dist ./backend/public

EXPOSE 3000

CMD ["node", "backend/index.js"]
