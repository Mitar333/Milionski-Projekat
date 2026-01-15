import { CloseButton } from "./DateTable";

function DeleteModal({ serviceToDelete, services, type }) {
  const config = {
    employee: { title: "radnika", name: "radnika" },
    service: { title: "usluge", name: "uslugu" },
  };

  const text = config[type] || { title: "stavke", name: "stavku" };
  const itemName = services.find((e) => e.id === serviceToDelete)?.name;

  return (
    <div className="flex flex-col items-center text-center p-2 max-w-sm">
      <div className="mb-6 flex items-center justify-center w-20 h-20 bg-rose-100 text-rose-600 rounded-full animate-pulse">
        <span className="text-4xl">⚠️</span>
      </div>

      <h1 className="text-2xl font-black text-gray-900 mb-2">
        Brisanje {text.title}
      </h1>

      <p className="text-gray-500 font-medium leading-relaxed">
        Da li ste sigurni da želite obrisati {text.name}{" "}
        <span className="text-gray-900 font-bold uppercase">{itemName}</span>?
        Ova radnja se ne može poništiti.
      </p>

      <div className="flex flex-col w-full gap-3 mt-8">
        <button
          onClick={() => console.log(`Brisanje ${type}:`, serviceToDelete)}
          className="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white font-black rounded-2xl shadow-lg shadow-rose-200 transition-all active:scale-95 uppercase tracking-wider"
        >
          Da, obriši {text.name}
        </button>
        <CloseButton />
      </div>
    </div>
  );
}

export default DeleteModal;
