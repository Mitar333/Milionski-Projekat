import { Link } from "react-router-dom";

function EmployeeFooter({ trenutno }) {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-100 pb-safe-area-inset-bottom">
      <div className="max-w-2xl mx-auto flex justify-around items-center h-12 px-4">
        {trenutno !== "/" && (
          <Link
            className="flex flex-col items-center gap-1 transition-colors text-blue-600"
            to={`/employee`}
          >
            Pocetna
          </Link>
        )}
        {trenutno !== "/hours" && (
          <Link
            className="flex flex-col items-center gap-1 transition-colors text-blue-600"
            to={`/employee/employee-working-hours`}
          >
            Radno vrijeme
          </Link>
        )}
        {trenutno !== "/archive" && (
          <Link
            className="flex flex-col items-center gap-1 transition-colors text-blue-600"
            to={`/employee/employee-archive`}
          >
            Arhiva
          </Link>
        )}
      </div>
    </footer>
  );
}

export default EmployeeFooter;
