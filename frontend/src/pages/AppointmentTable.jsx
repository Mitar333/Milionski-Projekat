//NE SJECAM SE KADA SAM OVO NAPRAVIO KORISTITI PRAVILO NE DIRANJA KAPIJE ZA KOJU NE ZNAS STA RADI DOK NE SAZNAS STA TACNO RADI

// import { getDay } from "date-fns";
// import Header from "../components/Header";
// import { GoArrowLeft, GoArrowRight } from "react-icons/go";
// import { useState } from "react";
// function AppointmentTable() {
//   const radnoVrijeme = {
//     start: "7:00",
//     end: "15:00",
//     pauses: [{ start: "7:00", end: "8:00" }],
//     isOpen: true,
//   }; //treba api endpoint gdje saljem new Date() i on daje radno vrijeme za danas ili za drugi datum radno vrijeme tog dana
//   const trajanjeTermina = 10;
//   let [sati, minuta] = radnoVrijeme.start.split(":");
//   let [endSati, endMinuta] = radnoVrijeme.end.split(":");
//   sati = Number(sati);
//   minuta = Number(minuta) + sati * 60;
//   endSati = Number(endSati);
//   endMinuta = Number(endMinuta) + endSati * 60;
//   //let zasadSati = sati;
//   const listaMogucih = [];
//   for (
//     let zasadMinuta = minuta;
//     zasadMinuta < endMinuta;
//     zasadMinuta += trajanjeTermina
//   ) {
//     if (radnoVrijeme.isOpen) {
//       let h = Math.floor(zasadMinuta / 60);
//       let m = zasadMinuta;
//       let h2 = h;
//       let m2 = m + trajanjeTermina;
//       let min = zasadMinuta - 60 * h;
//       let min2 = min + 10;

//       let pase = radnoVrijeme.pauses.map((pauza) => {
//         let [pauzaSati, pauzaMinuta] = pauza.start.split(":");
//         let [pauzaEndSati, pauzaEndMinuta] = pauza.end.split(":");
//         pauzaMinuta = Number(pauzaMinuta) + Number(pauzaSati) * 60;
//         pauzaEndMinuta = Number(pauzaEndMinuta) + Number(pauzaEndSati) * 60;

//         if (m2 <= pauzaMinuta) {
//           return true;
//         } else if (m >= pauzaEndMinuta) {
//           return true;
//         } else {
//           return false;
//         }
//       });
//       pase = pase.reduce((acc, bool) => acc && bool, true);

//       if (min2 >= 60) {
//         min2 = min2 - 60;
//         h2++;
//       }
//       if (pase) {
//         listaMogucih.push({
//           start: `${h}:${min === 0 ? "00" : min}`,
//           end: `${h2}:${min2 === 0 ? "00" : min2}`,
//           possible: true,
//         });
//       } else {
//         listaMogucih.push({
//           start: `${h}:${min === 0 ? "00" : min}`,
//           end: `${h2}:${min2 === 0 ? "00" : min2}`,
//           possible: false,
//         }); //oznacava prvi poslije pauze, mozda kada bude trebalo u drugom fajlu da pokazuje prvi poslije nekog drugog termina
//       }
//     }
//   }

//   const pet = ["", "", "", "", ""];
//   const sedam = ["", "", "", "", "", "", ""];
//   const today = new Date();
//   const [year, setYear] = useState(new Date().getFullYear());
//   const [month, setMonth] = useState(new Date().getMonth());
//   const [day, setDay] = useState(new Date().getDate());
//   const [dayOfWeek, setDayOfWeek] = useState(new Date().getDay());
//   let prviUMjesecu = getDay(new Date(year, month, 1));
//   if (prviUMjesecu === 0) prviUMjesecu = 7;
//   const months = {
//     0: [31, "Januar"],
//     1: [28, "Februar"],
//     2: [31, "Mart"],
//     3: [30, "April"],
//     4: [31, "Maj"],
//     5: [30, "Jun"],
//     6: [31, "Jul"],
//     7: [31, "Avgust"],
//     8: [30, "Septembar"],
//     9: [31, "Oktobar"],
//     10: [30, "Novembar"],
//     11: [31, "Decembar"],
//   };
//   const daysOfWeek = {
//     1: "Ponedjeljak",
//     2: "Utorak",
//     3: "Srijeda",
//     4: "Četvrtak",
//     5: "Petak",
//     6: "Subota",
//     0: "Nedjelja",
//   };
//   let max = months[month].at(0) + 1;

//   const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

//   if (max === 29 && isLeap) {
//     max++;
//   }
//   const prvaSedmica = [];

//   let datum = 1;
//   for (let i = 1; i < 8; i++) {
//     if (i < prviUMjesecu) {
//       prvaSedmica.push("");
//     } else {
//       prvaSedmica.push(datum);
//       datum += 1;
//     }
//   }
//   const nedelja = prvaSedmica.at(6);

//   function handleNextMonth() {
//     if (month === 11) {
//       setYear((y) => y + 1);
//       setMonth(0);
//     } else {
//       setMonth((m) => m + 1);
//     }
//   }
//   function handlePrevMonth() {
//     if (month === 0) {
//       setMonth(11);
//       setYear((y) => y - 1);
//     } else setMonth((m) => m - 1);
//   }

//   function handleSelectDay(dan, k) {
//     if (dan && dan < max) {
//       setDay(dan);
//       setDayOfWeek(k);
//     }
//   }
//   return (
//     <div className="max-w-md mx-auto p-4 bg-white shadow-sm">
//       <Header label="Rezervacija" to="/admin" />

//       <div className="py-4">
//         {/*Naslov meseca ide VAN tabele ili u <caption> */}
//         <div className="flex items-center justify-center gap-4">
//           {month !== today.getMonth() && (
//             <button className="cursor-pointer" onClick={handlePrevMonth}>
//               <GoArrowLeft size={24} />
//             </button>
//           )}

//           <h1 className="text-base font-bold">
//             {daysOfWeek[dayOfWeek]}, {day}-ti {months[month].at(1)}, {year}
//           </h1>

//           <button className="cursor-pointer" onClick={handleNextMonth}>
//             <GoArrowRight size={24} />
//           </button>
//         </div>

//         <table className="min-w-full border border-black mt-4">
//           <thead>
//             <tr>
//               {/* Koristimo <th> jer su to naslovi kolona, text-center ih centrira */}

//               {Object.values(daysOfWeek).map((dan, i) => (
//                 <th
//                   className="border border-black text-center"
//                   key={`dan-${i}`}
//                 >
//                   {dan.slice(0, 3)}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               {prvaSedmica.map((dan, i) => (
//                 <Td
//                   dan={dan}
//                   key={`dan-${i}`}
//                   k={`dann-${i}`}
//                   handleSelectDay={handleSelectDay}
//                 >
//                   {dan}
//                 </Td>
//               ))}
//             </tr>
//             {pet.map((c, i) => (
//               <tr key={i}>
//                 {sedam.map((s, k) => {
//                   const dan = i * 7 + (k + 1 + nedelja);
//                   return (
//                     <Td
//                       dan={dan}
//                       k={`dan-${k}`}
//                       key={`dann-${k}`}
//                       handleSelectDay={handleSelectDay}
//                     >
//                       {dan < max ? dan : ""}
//                     </Td>
//                   );
//                 })}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       {/* Horizontalna lista termina*/}
//       <div className="flex items-center overflow-x-auto overflow-y-hidden gap-2 py-1 no-scrollbar h-11">
//         {listaMogucih.map((termin, index) => (
//           <button
//             key={index}
//             disabled={!termin.possible}
//             className={`px-4 py-1.5 rounded-full text-sm font-medium shrink-0 transition
//             ${
//               termin.possible
//                 ? "bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white"
//                 : "bg-gray-100 text-gray-400 cursor-not-allowed"
//             }
//           `}
//           >
//             {termin.start} - {termin.end}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default AppointmentTable;
// function Td({ children, dan, k, handleSelectDay }) {
//   k = k.slice(k, -1);
//   return (
//     <td
//       // Ključ (key) se obično stavlja tamo gde pozivaš <Td />, ali neka ostane i ovde radi sigurnosti
//       className="border border-black text-center cursor-pointer hover:bg-blue-50 transition-colors duration-200 active:bg-blue-100"
//       onClick={() => handleSelectDay(dan, k)}
//     >
//       {children}
//     </td>
//   );
// }

// /*
// import { useState } from "react";
// import Header from "../components/Header";
// import { getDay } from "date-fns";
// import { GoArrowLeft, GoArrowRight } from "react-icons/go";
// function AppointmentTable() {
//   //setMonth
//   const pet = ["", "", "", "", ""];
//   const sedam = ["", "", "", "", "", "", ""];
//   const today = new Date();
//   const [year, setYear] = useState(new Date().getFullYear());
//   const [month, setMonth] = useState(new Date().getMonth());
//   let prviUMjesecu = getDay(new Date(year, month, 1));
//   if (prviUMjesecu === 0) prviUMjesecu = 7;
//   const months = {
//     0: [31, "Januar"],
//     1: [28, "Februar"],
//     2: [31, "Mart"],
//     3: [30, "April"],
//     4: [31, "Maj"],
//     5: [30, "Jun"],
//     6: [31, "Jul"],
//     7: [31, "Avgust"],
//     8: [30, "Septembar"],
//     9: [31, "Oktobar"],
//     10: [30, "Novembar"],
//     11: [31, "Decembar"],
//   };
//   let max = months[month].at(0) + 1;

//   const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

//   if (max === 29 && isLeap) {
//     max++;
//   }
//   const prvaSedmica = [];

//   let datum = 1;
//   for (let i = 1; i < 8; i++) {
//     if (i < prviUMjesecu) {
//       prvaSedmica.push("");
//     } else {
//       prvaSedmica.push(datum);
//       datum += 1;
//     }
//   }
//   const nedelja = prvaSedmica.at(6);

//   //setYear
//   // const [day, setDay] = useState();
//   // const [dayOfWeek, setDayOfWeek] = useState();
//   function handleNextMonth() {
//     if (month === 11) {
//       setYear((y) => y + 1);
//       setMonth(0);
//     } else {
//       setMonth((m) => m + 1);
//     }
//   }
//   function handlePrevMonth() {
//     if (month === 0) {
//       setMonth(11);
//       setYear((y) => y + 1);
//     } else setMonth((m) => m + 1);
//   }
//   return (
//     <div className="pt-4">
//       <Header label="To be implemented" to="/admin" />
//       {/* Naslov meseca ide VAN tabele ili u <caption> }
//       <div className="flex items-center justify-center gap-4">
//         {month !== today.getMonth() && (
//           <button className="cursor-pointer" onClick={handlePrevMonth}>
//             <GoArrowLeft size={24} />
//           </button>
//         )}

//         <h1 className="text-xl font-bold">
//           {months[month].at(1)}, {year}
//         </h1>

//         <button className="cursor-pointer" onClick={handleNextMonth}>
//           <GoArrowRight size={24} />
//         </button>
//       </div>

//       <table className="min-w-full border border-black mt-4">
//         <thead>
//           <tr>
//             {/* Koristimo <th> jer su to naslovi kolona, text-center ih centrira }
//             <th className="border border-black text-center">Pon</th>
//             <th className="border border-black text-center">Uto</th>
//             <th className="border border-black text-center">Sri</th>
//             <th className="border border-black text-center">Čet</th>
//             <th className="border border-black text-center">Pet</th>
//             <th className="border border-black text-center">Sub</th>
//             <th className="border border-black text-center">Ned</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             {prvaSedmica.map((dan, i) => (
//               <td className="border border-black text-center" key={i}>
//                 {dan}
//               </td>
//             ))}
//           </tr>
//           {pet.map((c, i) => (
//             <tr key={i}>
//               {sedam.map((s, k) => {
//                 const dan = i * 7 + (k + 1 + nedelja);
//                 return (
//                   <td key={k} className="border border-black text-center">
//                     {dan < max ? dan : ""}
//                   </td>
//                 );
//               })}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default AppointmentTable;
// */
// /*      // let pase = radnoVrijeme.pauses.map((pauza) => {
//       //   let [pauzaSati, pauzaMinuta] = pauza.start.split(":");
//       //   let [pauzaEndSati, pauzaEndMinuta] = pauza.end.split(":");
//       //   pauzaSati = Number(pauzaSati);
//       //   pauzaMinuta = Number(pauzaMinuta);
//       //   pauzaEndSati = Number(pauzaEndSati);
//       //   pauzaEndMinuta = Number(pauzaEndMinuta);
//       //   if (60 > zasadMinuta + trajanjeTermina) {
//       //     //7:00-7:10
//       //     if (zasadSati < pauzaSati) {
//       //       return true;
//       //     } else if (zasadSati > pauzaEndSati) {
//       //       return true;
//       //     } else if (
//       //       zasadSati === pauzaSati &&
//       //       pauzaMinuta >= zasadMinuta + trajanjeTermina
//       //     ) {
//       //       return true;
//       //     } else if (
//       //       zasadSati === pauzaEndSati &&
//       //       pauzaEndMinuta <= zasadMinuta
//       //     ) {
//       //       return true;
//       //     } else {
//       //       return false;
//       //     }
//       //   } else {
//       //     //7:50-8:00
//       //     if (zasadSati + 1 < pauzaSati) {
//       //       return true;
//       //     } else if (
//       //       zasadSati < pauzaSati &&
//       //       pauzaMinuta >= zasadMinuta + trajanjeTermina - 60
//       //     ) {
//       //       return true;
//       //     } else if (zasadSati + 1 > pauzaEndSati) {
//       //       return true;
//       //     } else if (
//       //       zasadSati > pauzaEndSati &&
//       //       pauzaEndMinuta <= zasadMinuta + trajanjeTermina - 60
//       //     ) {
//       //       return true;
//       //     } else {
//       //       return false;
//       //     }
//       //   }
//       // });
//       // pase = pase.reduce((acc, bool) => acc && bool, true);
//       // console.log(pase);*/
