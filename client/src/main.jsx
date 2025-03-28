import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./components/ui/theme-provider";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store";
import Login from "./components/Mycomponets/auth/Login";
import MetaMaskConnect from "./components/Mycomponets/metamask/MetaMaskConnect";
import CreateForm from "./components/Mycomponets/forms/CreateForm";
import FileUpload from "./components/Mycomponets/forms/FileUpload";
import { ContractProvider } from "./ContractContext/ContractContext";
import { PersistGate } from "redux-persist/integration/react";
import View from "./components/Mycomponets/fileview/View";
import AdminHeadPanel from "./components/Mycomponets/forms/AdminHeadPanel";
import RequestViewPage from "./components/Mycomponets/showFiles/RequestViewPage";
import HomePage from "./components/Mycomponets/HomePages/Home";
import NotificationView from "./components/Mycomponets/showFiles/NotificationPage";
import PricingPage from "./components/Mycomponets/Others/PricingPage";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="/login" element={<Login />} />
        <Route path="/connectmetamask" element={<MetaMaskConnect />} />

        {/* restricted usrsroute */}
        <Route path="/" element={<HomePage />}/>
        <Route path="/createuser" element={<CreateForm />} />
        <Route path="/uploadfiles" element={<FileUpload />} />
        <Route path="/view" element={<View />} />
        <Route path="/assignpanel" element={<AdminHeadPanel />} />
        <Route path="/requests" element={<RequestViewPage />} />
        <Route path="/notications" element={<NotificationView/>}/>
        <Route path="/pricing" element={<PricingPage/>}/>
      </Route>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <PersistGate loading={null} persistor={persistor}>
          <ContractProvider>
            <Toaster />
            <RouterProvider router={router} />
          </ContractProvider>
        </PersistGate>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
