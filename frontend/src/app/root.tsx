import { Outlet } from "react-router-dom";
import "./app.css"; // Tailwind stilovi
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Toaster } from "react-hot-toast";
export default function Root() {
  return (
    <div>
      <main>
        <div>
          <Toaster />
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Outlet />
        </LocalizationProvider>
      </main>
    </div>
  );
}
