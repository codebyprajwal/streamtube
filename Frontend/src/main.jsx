import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './resources/styles/main.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from "react-query"


const client = new QueryClient({
  defaultOptions: {
    queries: {
      //other query settings
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={client}>
    <BrowserRouter>
    <App />
  </BrowserRouter>
  </QueryClientProvider>,
)
