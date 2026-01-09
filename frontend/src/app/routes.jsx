/*
ukinuti History.jsx jer nema potrebe za njom ako postoji UserAppointments.jsx koji treba prilagoditi da objedini ono sto je history imao,
ili ga ostaviti ali promijeniti njegovu namjenu

default radno vrijeme za salon i racunanje istoga objediniti u 1 hook

http://localhost:5173/admin/1/archive napraviti ljepsi od do za izabiranje datuma i posebna komponenta za to
 
http://localhost:5173/admin/1/working-hours modal napravljen radi bez pronadjenih bugova, smanjiti kolicinu koda u DateTable.jsx odrzati funkcionalnost


http://localhost:5173/admin/1/services-details napraviti modal za dodavanje editovanje i brisanje
http://localhost:5173/admin/1/employees-details napraviti modal za dodavanje editovanje i brisanje

http://localhost:5173/admin/1 dodavanje rezervacije od strane walk inova, sledeci termin je njihov npr, mozda label za koliko sledeci moguci



route("/login", "../components/App.jsx"), za implementirati od 0
route("/register", "../components/App.jsx"), za implementirati od 0
route("/forgot-password", "../components/App.jsx"), za implementirati od 0

za kasnije {
http://localhost:5173/inbox dodati mogucnost adminu da pise, automatske poruke - nemoguce dok nemamo session
http://localhost:5173/appointments popraviti prikazi vise, radi ono ali nije najljepse (mozda dodati search opciju zajedno kada budem to radio za arhivu salona)
http://localhost:5173/settings/history (mozda dodati search opciju zajedno kada budem to radio za arhivu salona)
}



sve testirati sa jos mock data
*/

import { index, layout, prefix, route } from "@react-router/dev/routes";

const routes = [
  // route("/login", "../components/App.jsx"),
  // route("/register", "../components/App.jsx"),
  // route("/forgot-password", "../components/App.jsx"),

  ...prefix("/", [
    index("../pages/UserDashboard.jsx"), //user dashboard
    ...prefix("select", [
      layout("../pages/SelectLayout.jsx", [
        route("/salon", "../features/user/select/SelectSalon.jsx"), //odabir salona (ako je fransiza,ako nije onda se skipuje za usera)
        route("/employee", "../features/user/select/SelectEmployee.jsx"), //odabir radnika (ako je veci salon,ako nije onda se skipuje za usera)
        route("/service", "../features/user/select/SelectService.jsx"), //odabir usluge koju salon nudi
        route("/appointment", "../features/user/select/SelectAppointment.jsx"), //odabir termina koji pase korisniku
      ]),
    ]),

    route("/inbox", "../pages/UserInbox.jsx"), //postansko sanduce svakog usera
    route("/appointments", "../pages/UserAppointments.jsx"), //svi zakazani termini usera ((C)RUD)

    ...prefix("settings", [
      index("../features/user/settings/SettingsOverview.jsx"),
      route("/history", "../features/user/settings/History.jsx"), //pregled svih termina koje je user dotad rezervisao
      route("/privacy-policy", "../features/user/settings/PrivacyPolicy.jsx"), //zasad generican
      route("/faq", "../features/user/settings/Faq.jsx"), //zasad generican
      route("/profile", "../features/user/settings/Profile.jsx"), //(C)RUD operacije sa profilom
    ]),
  ]),

  ...prefix("/admin", [
    index("../pages/AdminSelectSalon.jsx"),
    ...prefix("/:salonId", [
      index("../pages/AdminDasboard.jsx"),

      route("/services-details", "../pages/ServiceDetails.jsx"),
      route("/employees-details", "../pages/EmployeeDetails.jsx"),

      route("/working-hours", "../pages/WorkingHours.jsx"),
      route("/archive", "../pages/Archive.jsx"), //Lijepa tabela sa pregledom svakog dana sa radnikom, usluzenim klijentima i ostalim neophodnim parametrima//NISAM zavrsio
    ]),
  ]),

  route("*", "../components/NotFound.jsx"),
];

export default routes;
