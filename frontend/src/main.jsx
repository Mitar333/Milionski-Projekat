import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./app/routes";
import "./index.css"; // Tailwind stilovi

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
