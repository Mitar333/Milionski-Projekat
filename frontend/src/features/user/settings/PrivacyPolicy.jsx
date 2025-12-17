function PrivacyPolicy() {
  return (
    <div className="animate-fadeIn prose prose-sm">
      <h2 className="text-lg font-bold text-gray-800 mb-4">
        Politika Privatnosti
      </h2>

      <div className="space-y-6 text-gray-600 leading-relaxed">
        <section>
          <h3 className="text-sm font-bold text-gray-700 uppercase mb-2">
            1. Koje podatke prikupljamo?
          </h3>
          <p className="text-sm">
            Prikupljamo vaše ime, prezime, broj telefona i email adresu
            isključivo u svrhu rezervacije termina i komunikacije vezane uz vaše
            posjete salonu.
          </p>
        </section>

        <section>
          <h3 className="text-sm font-bold text-gray-700 uppercase mb-2">
            2. Kako koristimo podatke?
          </h3>
          <p className="text-sm">
            Vaši podaci se koriste isključivo unutar našeg sustava. Nikada ih ne
            dijelimo s trećim stranama niti ih koristimo za neželjeni marketing
            (SPAM).
          </p>
        </section>

        <section className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <p className="text-xs text-blue-700 italic">
            Zadnja izmjena: 17.12.2025. Ukoliko imate pitanja, kontaktirajte nas
            na support@salon.ba
          </p>
        </section>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
