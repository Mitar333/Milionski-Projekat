import Footer from "../components/Footer";
import Header from "../components/Header";

const unreadMessages = [
  {
    id: 1,
    title: "Božićni popusti 2025",
    body: "Ovog Božića kao i svakoga naš salon nudi popuste za korisnike u periodu od 15.12. do 15.1. \nVidimo se",
    date: "17. Pro 2025",
  },
];

const oldMessages = [
  {
    id: 2,
    title: "Božićni popusti 2024",
    body: "Ovog Božića kao i svakoga naš salon nudi popuste za korisnike u periodu od 15.12. do 15.1. \nVidimo se",
    date: "20. Pro 2024",
  },
];

function MessageCard({ message, isUnread }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer mb-3 relative overflow-hidden">
      {/* Indikator za nepročitano */}
      {isUnread && (
        <div className="absolute left-0 top-0 h-full w-1 bg-blue-500" />
      )}

      <div className="flex justify-between items-start mb-1">
        <h3
          className={`font-semibold ${isUnread ? "text-gray-900" : "text-gray-600"}`}
        >
          {message.title}
        </h3>
        <span className="text-xs text-gray-400">{message.date}</span>
      </div>

      <p className="text-gray-500 text-sm line-clamp-2">{message.body}</p>
    </div>
  );
}

function UserInbox() {
  return (
    <>
      <div className="min-h-screen bg-gray-50 pb-10">
        <Header label="Inbox" />

        <div className="max-w-2xl mx-auto px-4 mt-6">
          {/* Sekcija: Nove poruke */}
          <section className="mb-8">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center">
              Nove poruke
              <span className="ml-2 bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-[10px]">
                {unreadMessages.length}
              </span>
            </h2>
            {unreadMessages.map((msg) => (
              <MessageCard key={msg.id} message={msg} isUnread={true} />
            ))}
          </section>

          {/* Sekcija: Prethodne poruke */}
          <section>
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
              Starije poruke
            </h2>
            {oldMessages.map((msg) => (
              <MessageCard key={msg.id} message={msg} isUnread={false} />
            ))}
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserInbox;
