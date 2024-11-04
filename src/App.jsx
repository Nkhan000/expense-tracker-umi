import GlobalStyles from "./styles/GlobalStyles";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./UI/AppLayout";
import Home from "./Pages/Home";

import Tracker from "./Pages/Tracker";
import NotFound from "./Pages/NotFound";
import { TrackerProvider } from "./UI/TrackerContext";

function App() {
  return (
    <TrackerProvider>
      <BrowserRouter>
        <GlobalStyles />
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="home" />} />
            <Route path="/home" element={<Home />} />

            <Route path="tracker" element={<Tracker />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TrackerProvider>
  );
}

export default App;
