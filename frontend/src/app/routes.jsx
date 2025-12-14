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
      layout("../pages/UserSettingsLayout.jsx", [
        index("../features/user/settings/SettingsOverview.jsx"), //pregled svega sto je moguce modifikovati
        route("/history", "../features/user/settings/History.jsx"), //pregled svih termina koje je user dotad rezervisao
        route("/privacy-policy", "../features/user/settings/PrivacyPolicy.jsx"), //zasad generican
        route("/faq", "../features/user/settings/Faq.jsx"), //zasad generican
        route("/profile", "../features/user/settings/Profile.jsx"), //(C)RUD operacije sa profilom
      ]),
    ]),
  ]),

  ...prefix("/admin", [
    index("../pages/AdminDasboard.jsx"), //admin dashboard
    route("/table-details", "../pages/AppointmentTable.jsx"), //detaljnija tabela dana
    route("/salon-details", "../pages/SalonDetails.jsx"), //upravljanje podacima usluga i radnika
    route("/working-hours", "../pages/WorkingHours.jsx"), //upravljanje radnim vremenom radnika
    route("archive", "../pages/Archive.jsx"), //Lijepa tabela sa pregledom svakog dana sa radnikom, usluzenim klijentima i ostalim neophodnim parametrima
  ]), //admin dashboard

  route("*", "../components/NotFound.jsx"),
];

export default routes;
