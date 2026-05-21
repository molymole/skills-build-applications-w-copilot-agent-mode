# OctoFit Frontend

This React 19 app uses `react-router-dom` for navigation and calls the backend API under `/api`.

## Environment configuration

Define `VITE_CODESPACE_NAME` in `octofit-tracker/frontend/.env.local` when running in Codespaces:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

The app builds API URLs as:

`https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/`

If `VITE_CODESPACE_NAME` is not set, the app safely falls back to:

`http://localhost:8000/api/[component]/`

This prevents invalid URLs such as `https://undefined-8000.app.github.dev/...`.

## Run

```bash
npm install --prefix octofit-tracker/frontend
npm run dev --prefix octofit-tracker/frontend
```
