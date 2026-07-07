# Weather Dashboard

A responsive weather dashboard built with React, TypeScript and Vite that displays current weather conditions and a 5-day forecast in 3-hour intervals for any city using the OpenWeather API.

## Live Demo

https://weather-dashboard.vercel.app

## Features

- Search weather by city
- Current weather banner
- 5-day forecast with 3-hour intervals
- Responsive design for mobile, tablet and desktop
- Loading indicators
- User-friendly error handling
- Accessibility score of 100 (Lighthouse)
- Unit and integration tests
- API caching with React Query

## Screenshots

### Desktop

*(Add a screenshot here)*

### Mobile

*(Add a screenshot here)*

## Tech Stack

- React
- TypeScript
- Vite
- TanStack React Query
- OpenWeather API
- Vitest
- React Testing Library
- CSS

## Getting Started

### Clone the repository

```bash
git clone https://github.com/dmk16/WeatherApp.git
```

### Install dependencies

```bash
npm install
```

### Create a `.env` file

```env
VITE_OPENWEATHER_API_KEY=your_api_key
```

### Start the development server

```bash
npm run dev
```

## Running Tests

```bash
npm test
```

## Project Structure

```text
src/
├── components/
├── hooks/
├── models/
├── services/
├── test/
└── utils/
```

## Accessibility

This application was built with accessibility in mind, including:

- Semantic HTML
- Keyboard navigation
- Screen reader labels
- Visible focus states
- Lighthouse Accessibility score: **100**

## Future Improvements

- Use the user's current location
- Save favourite cities
- Search auto-complete suggestions
- Dark mode
- Interactive weather maps

## Author

Deveena Kalaria
