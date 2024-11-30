# MERN Full Stack Web Application

Stock Terminal is a stock market portfolio tracking web application built using the MERN stack.
I was inspired by the Delta mobile application, built by etoro which is a free and robust portfolio tracker
that I utilise on a day to day basis.

Technologies used: 
```Bash
Frontend: React, TypeScript, Redux-Toolkit, Tailwind CSS, Shadcn ui component library
Backend: Express js for the backend server, MongoDB for a NoSQL database
APIs: AlphaVantage, Polygon.io
```

## DEV ROADMAP
- [x] Create login page
- [x] Fetch portfolios from DB
- [x] Modify DB collection to include profile images
- [x] Create three users in DB, with profile images
- [x] Pass user's portfolio from loginPage to HomePage after navigation (Redux)
- [x] PortfolioCards & Portfolio components require current prices for each holding (use AlphaVantage), implement in HomePage, share as props
- [x] Share current price with Portfolio.tsx component for currentPrice field in table
- [x] Implement functions in Portfolio.tsx component to calculate PNL % and Profit/Loss based on user holdings data
- [x] Add logic to conditionally render an "add positions" button inside the table component if the user has no holdings
- [x] Add a "add position" button to add another holding to the user's portfolio
- [] Add a bin icon to each holding in the portfolio table which triggers a pop up asking for deletion confirmation
- [] Implement MongoDB holding deletion API call when the popup button is clicked.
- [] Implement route for when a user clicks on a holding, it takes them to the stockHolding page
- [] Ensure that holding details are shared to the stockHolding page (using Redux Slices)
- [] Implement the stockHolding page with a chart and various stock information
- [] Add buy & sell functionality to allow the user to update their holding information for that stock (update API call to MongoDB)
- [] Still to be decided, but when buy/sell button is clicked, trigger popup with a slider allowing them to select how many shares to buy/sell
- [] Ensure than once a user has navigated to homepage, userSelected remains selected in LoginPage
- [] Ensure that once a user navigates to the homepage, portfolio holdings data remains there even if they leave the page
- [] Setup a chart component to track the user's portfolio performance over time

## Setting up the project
Check tailwind setup process for Vite React - config modification required: [tailwind css](https://tailwindcss.com/docs/guides/vite)
```js
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Install the other required dependencies
- Shadcn ui for Vite installation guide: [Shadcn ui](https://ui.shadcn.com/docs/installation/vite)
```js
npm install react-redux @reduxjs/toolkit millify moment
npm install react-router-dom
```

Installing a Radix-ui component used in Shadcn:
```js
npm install @radix-ui/react-slot@latest -E 
```

- Backend Express js server setup
```js
npm install express mongoose dotenv
npm i nodemon -D
```

## Updating MongoDB from Shell
- Navigate to mongosh install location
```Bash
cd C:\Users\Dylan Dalton\AppData\Local\Programs\mongosh\
.\mongosh.exe "mongodb+srv://dylandaltonza:LyBcBorMHAolAIeQ@cluster0.p0tkt.mongodb.net/portfolios"
db.portfolios.updateMany({}, { $set: { avatarUrl: null } })
```

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
