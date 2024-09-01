import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { Provider } from "react-redux";
import { store } from "./redux";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />{" "}
    </Provider>
  );
}

export default App;
