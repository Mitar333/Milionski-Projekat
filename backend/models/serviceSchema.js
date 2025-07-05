const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Dodaj ovu liniju

const ServiceSchema = new mongoose.Schema({
    salonId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'Salon'
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxLength: 100 // ISPRAVLJENO: maxLenght -> maxLength
    },
    durationMinutes: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        default: "",
        trim: true,
        maxLength: 500 // DODATO: Ogranicenje duzine
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true }); // PREPORUKA: Koristi ovo!

// --- 1. Dodavanje indeksa za `name` ---
// Ovaj indeks je dobar.
ServiceSchema.index({ name: 1 });
// PREPORUKA: Ako zelis jedinstvenost imena usluge unutar salona, dodaj kompozitni indeks:
// ServiceSchema.index({ salonId: 1, name: 1 }, { unique: true });

// --- 2. Dodavanje validacije za `durationMinutes` i `price` ---
ServiceSchema.path('durationMinutes').validate(function(value) {
    return value > 0;
}, 'Duration must be a positive number.');

ServiceSchema.path('price').validate(function(value) {
    return value >= 0; // Cijena može biti 0
}, 'Price must be a non-negative number.');

// --- 3. Dodavanje ograničenja na dužinu `description` ---
ServiceSchema.path('description').validate(function(value) {
    return value.length <= 500;
}, 'Description must be less than or equal to 500 characters.');

// --- 5. Dodavanje pre-save hook-a za ažuriranje `updatedAt` ---
// OVO UKLONITI ako koristite timestamps: true
// ServiceSchema.pre('save', function(next) {
//     this.updatedAt = Date.now();
//     next();
// });

module.exports = mongoose.model('Service', ServiceSchema);
// //treba da mi pomognes da napravim ispravke pod brojevima:1,2,3,5,8
// // 1. **Dodavanje indeksa za `name`**:
// // ```javascript
// ServiceSchema.index({ name: 1 });
// // ```
// // 2. **Dodavanje validacije za `durationMinutes` i `price`**:
// // ```javascript
// ServiceSchema.path('durationMinutes').validate(function(value) {
//   return value > 0;
// }, 'Duration must be a positive number.');
// ServiceSchema.path('price').validate(function(value) {
//   return value > 0;
// }, 'Price must be a positive number.');
// // ```
// // 3. **Dodavanje ograničenja na dužinu `description`**:
// ServiceSchema.path('description').validate(function(value) {
//   return value.length <= 500; // primer ograničenja na 500 karaktera
// }, 'Description must be less than 500 characters.');
// // 5. **Dodavanje pre-save hook-a za ažuriranje `updatedAt`**:
// ServiceSchema.pre('save', function(next) {
//     this.updatedAt = Date.now();
//     next();
//     });





//analiziraj mi ovaj kod i pokazi mi greske i nedostatke
// Ovaj kod definira Mongoose shemu za model "Service" koji se koristi u aplikaciji za upravljanje salonima. Evo nekoliko potencijalnih grešaka i nedostataka:
// 1. **Nedostatak indeksa za `name`**: Ako se očekuje da će se često pretraživati po imenu usluge, bilo bi korisno dodati indeks na polje `name`.
// 2. **Nedostatak validacije za `durationMinutes` i `price`**: Nije jasno da li su `durationMinutes` i `price` pozitivni brojevi. Možda bi trebalo dodati validaciju da se osigura da su ovi brojevi veći od nule.
// 3. **Nedostatak validacije za `description`**: Iako je `description` opcionalno, možda bi bilo korisno dodati ograničenje na dužinu teksta kako bi se sprečilo unošenje predugih opisa.
// 4. **Nedostatak validacije za `isActive`**: Iako je `isActive` boolean, možda bi bilo korisno dodati validaciju da se osigura da je vrednost tačno `true` ili `false`.
// 5. **Nedostatak pre-save hook-a**: Ako se očekuje da se `updatedAt` polje ažurira svaki put kada se dokument sačuva, trebalo bi dodati pre-save hook koji automatski postavlja `updatedAt` na trenutni datum i vreme.
// 6. **Nedostatak jedinstvenosti za `name`**: Ako se očekuje da usluge imaju jedinstvena imena unutar salona, trebalo bi dodati `unique: true` na polje `name` kako bi se sprečilo dupliranje imena usluga u okviru istog salona.
// 7. **Nedostatak dokumentacije**: Bilo bi korisno dodati komentare ili JSDoc stil dokumentacije kako bi se olakšalo razumevanje svrhe svakog polja u shemi.
// 8. **Nedostatak testova**: Nije jasno da li su testovi napisani za ovaj model. Preporučuje se da se napišu testovi za validaciju i funkcionalnost modela kako bi se osigurala ispravnost koda.
// 9. **Nedostatak referenci na druge modele**: Ako se očekuje da se ovaj model koristi u vezi sa drugim modelima (npr. `Employee`, `User`), trebalo bi dodati reference na te modele kako bi se omogućila lakša navigacija između povezanih dokumenata.
// 10. **Nedostatak error handling-a**: Nije jasno kako se greške obrađuju prilikom interakcije sa ovim modelom. Preporučuje se implementacija error handling-a kako bi se osigurala stabilnost aplikacije u slučaju grešaka prilikom čuvanja ili preuzimanja podataka.
// 11. **Nedostatak transakcija**: Ako se ovaj model koristi u kontekstu transakcija (npr. prilikom kreiranja rezervacija), trebalo bi razmotriti korišćenje Mongoose transakcija kako bi se osigurala konzistentnost podataka u slučaju grešaka tokom operacija.
// 12. **Nedostatak enkripcije za osetljive podatke **: Iako ovaj model ne sadrži osetljive podatke poput lozinki, ako se u budućnosti doda polje koje sadrži osetljive informacije, trebalo bi razmotriti enkripciju tih podataka pre čuvanja u bazi podataka.
// 13. **Nedostatak verzionisanja**: Ako se očekuje da će se model često menjati, razmatranje verzionisanja modela može pomoći u praćenju promena i olakšati migraciju podataka u budućnosti.
// 14. **Nedostatak ograničenja na dužinu stringova**: Nije postavljeno ograničenje na dužinu stringova za polja `name` i `description`. Preporučuje se dodavanje ograničenja kako bi se sprečilo unošenje predugih stringova koji mogu uzrokovati probleme u bazi podataka ili aplikaciji.
// 15. **Nedostatak logovanja**: Nije jasno da li se loguju operacije nad ovim modelom. Preporučuje se implementacija logovanja kako bi se pratila aktivnost i greške u radu sa modelom.
// 16. **Nedostatak optimizacije upita**: Ako se očekuje da će se često pretraživati po poljima `salonId` ili `name`, trebalo bi razmotriti optimizaciju upita kako bi se poboljšale performanse aplikacije.
// 17. **Nedostatak ograničenja na vrednosti `isActive`
//poceo si se ponavljati znaci treba da mi pomognes da napravim ispravke pod brojevima:1,2,3,5,8
//**: Iako je `isActive` boolean, možda bi bilo korisno dodati ograničenje da se osigura da je vrednost tačno `true` ili `false`, iako Mongoose već to radi implicitno.





// 8. **Dodavanje testova**:
// Preporučuje se korišćenje biblioteke kao što je Mocha ili Jest za pisanje testova. Evo primera kako bi test mogao izgledati koristeći Mocha i Chai:
// ```javascript
// const chai = require('chai');
// const expect = chai.expect;
// const mongoose = require('mongoose');
// const Service = require('./path/to/your/serviceModel'); // putanja do modela
// describe('Service Model', function() {
//   before(function(done) {
//     mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true });
//     mongoose.connection.once('open', function() {
//       done();
//     });
//   });

//   after(function(done) {
//     mongoose.connection.close();
//     done();
//   });

//   it('should create a service with valid data', function(done) {
//     const service = new Service({
//       salonId: new mongoose.Types.ObjectId(),
//       name: 'Haircut',
//       durationMinutes: 30,
//       price: 20.00,
//       description: 'A simple haircut service.'
//     });

//     service.save(function(err, savedService) {
//       expect(err).to.be.null;
//       expect(savedService).to.have.property('_id');
//       done();
//     });
//   });

//   it('should not create a service with negative durationMinutes', function(done) {
//     const service = new Service({
//       salonId: new mongoose.Types.ObjectId(),
//       name: 'Haircut',
//       durationMinutes: -30,
//       price: 20.00
//     });

//     service.save(function(err) {
//       expect(err).to.not.be.null;
//       done();
//     });
//   });
// });

