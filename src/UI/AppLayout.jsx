import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { persistor, store } from "../Features/TrackerOperation";
import { PersistGate } from "redux-persist/es/integration/react";
import { Provider } from "react-redux";
// persistor
function PersistGateComponent() {
  return (
    <PersistGate loading={<>. . . loading</>} persistor={persistor}>
      <Header />
      <Outlet />
      <Footer />
    </PersistGate>
  );
}

function AppLayout() {
  console.log("App layout rendered");
  return (
    <Provider store={store}>
      <PersistGateComponent></PersistGateComponent>
    </Provider>
  );
}
export default AppLayout;
