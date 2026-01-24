import { getProgressBarPercentage } from "../utils/timeHelpers";

function ProgressBar({ trenutniTermin }) {
  return (
    <>
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider">
            Radnik: {trenutniTermin.employee}
          </p>
          <p className="text-xl font-black text-gray-800 tracking-tighter">
            {trenutniTermin.start} - {trenutniTermin.end}
          </p>
        </div>
        <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded-lg animate-pulse">
          U TOKU
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mt-4 mb-6">
        <div className="flex justify-between items-end mb-1.5 px-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Progres
          </span>
          <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
            {/* Skraćena matematika radi preglednosti */}
            {Math.round(getProgressBarPercentage(trenutniTermin))}%
          </span>
        </div>
        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-50">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all duration-1000"
            style={{
              width: `${getProgressBarPercentage(trenutniTermin)}%`,
            }}
          />
        </div>
      </div>
    </>
  );
}

export default ProgressBar;
