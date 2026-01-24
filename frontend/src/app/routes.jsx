/*
  CalendarContext dodati testove za funkcije
  calendarHelpers dodati testove za funkcije
*/

import { index, layout, prefix, route } from "@react-router/dev/routes";

const routes = [
  ...prefix("/", [
    index("../pages/UserDashboard.jsx"), //user dashboard

    route("/login", "../components/Login.jsx"),
    route("/register", "../components/Register.jsx"),
    route("/forgot-password", "../components/ForgotPassword.jsx"),

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

      route("/privacy-policy", "../features/user/settings/PrivacyPolicy.jsx"), //zasad generican
      route(
        "/privacy-policy/bez",
        "../features/user/settings/PrivacyPolicyBez.jsx",
      ),
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
  ...prefix("/employee", [
    index("../pages/EmployeeDasboard.jsx"),
    route("/employee-working-hours", "../pages/EmployeeWorkingHours.jsx"),
    route("/employee-archive", "../pages/EmployeeArchive.jsx"),
  ]),

  route("*", "../components/NotFound.jsx"),
];

export default routes;
