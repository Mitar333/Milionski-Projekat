const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Dodaj ovu liniju

const EmployeeSchema = new mongoose.Schema({
    salonId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'Salon',
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxLength: 100 // ISPRAVLJENO: maxLenght -> maxLength
    },
    bio: {
        type: String,
        default: "",
        maxLength: 500 // ISPRAVLJENO: maxLenght -> maxLength
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        // unique: true, // OPREZ: Kao što smo pričali, globalno unique je rijetko potrebno.
                        // Ako želiš da bude unique unutar SALONA, onda dodaj kompozitni index.
        match: [/^\+?\d{1,3}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/, 'Please fill a valid phone number']
    },
    email: {
        type: String,
        required: true,
        // unique: true, // OPREZ: Slično kao telefon. Ako je ovo za prijavu zaposlenika, onda je unique ok.
                       // Ako je samo za kontakt, razmisli o kompozitnom indeksu sa salonId.
        lowercase: true,
        trim: true,
        match: [/.+@.+\..+/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 6 // DODATO: Minimalna duzina lozinke
    },
    schedule: { // ISPRAVLJENO: scheadule -> schedule
        type: Map,
        of: String,
        default: {}
    },
    vacationDates: {
        type: [Date],
        default: []
    }
}, { timestamps: true }); // PREPORUKA: Koristi ovo!

module.exports = mongoose.model('Employee', EmployeeSchema);

    // scheadule:{
    //     type: Map,
    //     of: String,
    //     default: {}
    // },
    // vacationDates:{
    //     type: [Date],
    //     default: []
    // },
    //mozes li mi objasniti sta je ovo i kako se koristi?
    // Map je tip podataka u Mongoose koji omogućava skladištenje ključ-vrednost parova, slično objektima u JavaScript-u. U ovom slučaju, `scheadule` koristi Map da bi sačuvao radno vreme zaposlenog, gde su ključevi dani u nedelji (npr. "Monday", "Tuesday") a vrednosti su stringovi koji predstavljaju radno vreme za taj dan (npr. "9:00-17:00"). Ovo omogućava fleksibilno i dinamično upravljanje radnim vremenom zaposlenih.
// // `vacationDates` je niz datuma koji predstavlja datume kada zaposleni nije dostupan zbog odmora. Ovo omogućava da se lako prati kada zaposleni nije dostupan za rad,
// // što je korisno prilikom zakazivanja termina ili upravljanja rasporedom zaposlenih. Kada se koristi u aplikaciji, Map omogućava lako dodavanje, ažuriranje i brisanje radnih sati za različite dane, dok niz datuma omogućava jednostavno upravljanje i pregled odmora zaposlenih.
// // Ovaj pristup omogućava veću fleksibilnost i jednostavnost u upravljanju radnim vremenom i odsustvima zaposlenih u salonu.

// // Na primer, ako želite da dodate radno vreme za ponedeljak, možete jednostavno uraditi:
// employee.scheadule.set('Monday', '9:00-17:00');  
// // A ako želite da dodate datum odmora, možete uraditi:
// employee.vacationDates.push(new Date('2023-12-25'));
// de pregledaj imam li gresaka u kodu i daj mi savete kako da ga unapredim
// // Ovaj pristup omogućava veću fleksibilnost i jednostavnost u upr


