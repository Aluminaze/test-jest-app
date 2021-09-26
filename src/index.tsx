import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "components/App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "redux-app";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const app = (
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </QueryClientProvider>
);

ReactDOM.render(app, document.getElementById("root"));
