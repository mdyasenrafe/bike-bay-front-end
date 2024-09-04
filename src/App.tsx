import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { Provider } from "react-redux";
import { persistor, store } from "./redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY!);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toaster richColors position="top-center" />
        <Elements stripe={stripePromise}>
          <RouterProvider router={router} />
        </Elements>
      </PersistGate>
    </Provider>
  );
}

export default App;
