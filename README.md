# Pokemon Project

A RESTful API built using Node.js, Express, and MongoDB for managing Pokémon data.

## Features
- Create, Read, Update, Delete Pokémon
- MongoDB database integration with Mongoose
- Fully tested using Jest & Supertest

## Tech Stack
- React Vite, Redux-toolkit
- Node.js
- Express
- MongoDB + Mongoose
- Jest + Supertest

## Installation
git clone <repository-url>
cd Backend
cd Frontend
npm install

## Environment Variables
Create a `.env` file and add:
Backend Side `.env`
MONGO_URI=
PORT=3000
CLIENT_URL =

frontend side `.env`
VITE_API_URL =

## Run Frontend & Backend
npm start

## Run Tests
npm test

## API Endpoints

| Method | Endpoint | Description |
|-------|----------|-------------|
| POST  | /api/pokemon        | Create a Pokémon |
| GET   | /api/pokemon        | Get all Pokémon |
| GET   | /api/pokemon/:id    | Get Pokémon by ID |
| PUT   | /api/pokemon/:id    | Update Pokémon |
| DELETE| /api/pokemon/:id    | Delete Pokémon |

## Author
Dipendra Singh Patel
