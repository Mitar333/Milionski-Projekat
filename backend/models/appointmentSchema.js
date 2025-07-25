const mongoose = require('mongoose');
// const Schema = mongoose.Schema; // Dodaj ovu liniju ako nije globalno definirana

const AppointmentSchema = new mongoose.Schema({
    salonId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'Salon',
    },
    userId: { // Ovo bi trebao biti Client, ne User ako imas Client model
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // Promijenjeno iz 'User' u 'Client'
        index: true // DOBRO: dodaj indeks za brže pretrage po korisniku
    },
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Employee',
        index: true // DOBRO: dodaj indeks za brže pretrage po zaposlenom
    },
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Service',
        index: true // DOBRO: dodaj indeks za brže pretrage po usluzi
    },
    startTime: {
            type: String,
            // required: true, // Može biti opcionalno ako dani mogu biti zatvoreni
            match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, // Regex za HH:MM format
        required: true
    },
    endTime: {
                    type: String,
            // required: true, // Može biti opcionalno ako dani mogu biti zatvoreni
            match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, // Regex za HH:MM format
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'confirmed', 'cancelled', 'completed', 'no-show'], // DODATO: Ključno za validaciju
        default: 'pending' // DODATO: Početni status termina
    },
    notes: {
        type: String,
        trim: true,
        default: ''
    },
    isReminderSent: {
        type: Boolean,
        default: false
    }
}, { timestamps: true }); // PREPORUKA: Koristi ovo umjesto ručnih createdAt/updatedAt i pre('save') hooka

// Vaš predloženi hook za validaciju vremena je ODLICAN!
// Ostavite ga, čak i ako koristite timestamps: true, jer on provjerava logiku, ne update.
AppointmentSchema.pre('save', function(next) {
    if (this.startTime >= this.endTime) {
        return next(new Error('End time must be after start time'));
    }
    // this.updatedAt = Date.now(); // OVO UKLONITI ako koristite timestamps: true
    next();
});

// Vaš predloženi indeks je ODLICAN! Sprečava preklapanje termina za istog zaposlenog.
AppointmentSchema.index({ employeeId: 1, startTime: 1 }, { unique: true });

// DOBRO: Možeš dodati i indeks za brže pretrage po statusu ako ćeš često filtrirati
AppointmentSchema.index({ status: 1 });

module.exports = mongoose.model('Appointment', AppointmentSchema);



//LOG dopisivanja sa copilotom
//analiziraj moj kod i daj mi savete kako da ga unapredim
// 1. Razmisli o dodavanju indeksa na polja koja se često pretražuju, kao što su `userId`, `employeeId`, `serviceId` i `status`. To može poboljšati performanse upita.
// 2. Razmotri dodavanje validacije za `startTime` i `endTime` kako bi se osiguralo da `endTime` uvek bude posle `startTime`. Ovo može sprečiti greške prilikom zakazivanja termina.
// 3. Možda bi bilo korisno dodati polje `cancellationReason` koje bi se koristilo u slučaju otkazivanja termina. Ovo može pomoći u analizi razloga otkazivanja i poboljšanju usluga.
// 4. Razmisli o dodavanju polja `reminderTime` koje bi omogućilo korisnicima da podele kada žele da prime podsetnik za zakazani termin. Ovo može poboljšati korisničko iskustvo i smanjiti broj propuštenih termina.
// 5. Razmotri dodavanje polja `createdBy` i `updatedBy` kako bi se pratilo ko je kreirao ili ažurirao termin. Ovo može biti korisno za audit i praćenje promjena u sistemu.
// 6. Razmisli o dodavanju polja `cancellationTime` koje bi se koristilo za praćenje vremena otkazivanja termina. Ovo može pomoći u analizi i optimizaciji procesa otkazivanja.
// 7. Razmotri dodavanje polja `feedback` koje bi omogućilo korisnicima da ostave povratne informacije o zakazanom terminu. Ovo može pomoći u poboljšanju usluga i korisničkog iskustva.
// 8. Razmisli o dodavanju polja `appointmentType` koje bi omogućilo razlikovanje između različitih vrsta termina, kao što su konsultacije, tretmani ili pregledi. Ovo može pomoći u organizaciji i filtriranju termina u sistemu.
// 9. Razmotri dodavanje polja `paymentStatus` koje bi omogućilo praćenje statusa plaćanja za zakazane termine. Ovo može biti korisno ako se u budućnosti planira implementacija sistema plaćanja unutar aplikacije.
// 10. Razmisli o dodavanju polja `location` koje bi omoguć
//implementiraj ovo pod 2 
//ilo korisnicima da odaberu lokaciju za zakazani termin, ako salon ima više lokacija. Ovo može poboljšati korisničko iskustvo i olakšati organizaciju termina.


//znaci moglo bi se reci da je ova skripta gotova?
// Da, ova skripta za model "Appointment" je dobro strukturirana i pokriva osnovne aspekte zakazivanja termina. Međutim, uvek postoji prostor za unapređenje, kao što su dodavanje validacija, indeksa i dodatnih polja koja mogu poboljšati funkcionalnost i korisničko iskustvo. Ako su svi navedeni aspekti implementirani, model bi trebao biti spreman za upotrebu u aplikaciji.