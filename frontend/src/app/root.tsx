import { Outlet } from "react-router-dom";
import "./app.css"; // Tailwind stilovi

export default function Root() {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
