FROM node:20.18.0-alpine AS builder

WORKDIR /app

COPY wimp-Backend/package*.json ./backend/
COPY wimp-Backend/ ./backend/

RUN cd backend && npm install

COPY wimp-frontend/package*.json ./frontend/
COPY wimp-frontend/ ./frontend/
RUN cd frontend && npm install && npm run build

RUN cp -r ./frontend/build ./backend/build

FROM node:20.18.0-alpine

WORKDIR /app

COPY --from=builder /app/backend /app

EXPOSE 5000

CMD ["node", "index.js"]
