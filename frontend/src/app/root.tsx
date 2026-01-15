import { Outlet } from "react-router-dom";
import "./app.css"; // Tailwind stilovi
import { Toaster } from "react-hot-toast";
export default function Root() {
  return (
    <div>
      <main>
        <div>
          <Toaster />
        </div>
        <Outlet />
      </main>
    </div>
  );
}
