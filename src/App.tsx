import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { Provider } from "react-redux";
import { persistor, store } from "./redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toaster richColors position="top-center" />
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

export default App;
