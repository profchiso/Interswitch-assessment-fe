import React from "react";
import ReactDOM from "react-dom/client";
import InterswitchApp from "./App.jsx";
import "./index.css";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import { ConfigProvider, App } from "antd";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ConfigProvider>
          <App>
            <InterswitchApp />
          </App>
        </ConfigProvider>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
