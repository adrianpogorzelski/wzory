---
title: "Wypowiedzenie umowy o pracę z zachowaniem okresu wypowiedzenia"
categories: ["Prawo pracy"]
description: "Gotowy wzór wypowiedzenia umowy o pracę składany przez pracownika."
groups:
  - id: employee
    title: "Pracownik"
    description: "Osoba zatrudniona, która wypowiada umowę o pracę."
  - id: employer
    title: "Pracodawca"
    description: "Firma lub osoba, u której pracujesz i do której kierujesz wypowiedzenie."
  - id: contract
    title: "Umowa i okres wypowiedzenia"
    description: "Rodzaj umowy, data jej zawarcia i długość okresu wypowiedzenia."
fields:
  - { id: city, label: "Miejscowość", placeholder: "np. Warszawa" }
  - { id: date, label: "Data złożenia wypowiedzenia", type: date, hint: "Liczy się dzień, w którym pracodawca otrzymał pismo. Zadbaj o potwierdzenie odbioru." }

  - { id: employee-name, label: "Imię i nazwisko", group: employee, placeholder: "np. Jan Kowalski" }
  - { id: employee-address, label: "Adres zamieszkania", group: employee, placeholder: "np. ul. Długa 5/12, 00-001 Warszawa" }

  - { id: employer-name, label: "Nazwa pracodawcy", group: employer, placeholder: "np. ABC Sp. z o.o." }
  - { id: employer-address, label: "Adres siedziby", group: employer, placeholder: "np. ul. Prosta 1, 00-001 Warszawa" }

  - { id: contract-date, label: "Data zawarcia umowy", type: date, group: contract }
  - { id: contract-type, label: "Rodzaj umowy", type: choice, group: contract, options: [{ value: indefinite, label: "Na czas nieokreślony" }, { value: fixed, label: "Na czas określony" }, { value: probation, label: "Na okres próbny" }], hint: "Umowę na czas określony można wypowiedzieć tylko wtedy, gdy strony przewidziały taką możliwość w umowie." }
  - { id: notice-regular, label: "Okres wypowiedzenia", type: choice, group: contract, showWhen: "contract-type=indefinite,fixed", options: [{ value: w2, label: "2 tygodnie" }, { value: m1, label: "1 miesiąc" }, { value: m3, label: "3 miesiące" }], hint: "Zależy od stażu u tego pracodawcy: poniżej 6 miesięcy – 2 tygodnie, co najmniej 6 miesięcy – 1 miesiąc, co najmniej 3 lata – 3 miesiące." }
  - { id: notice-probation, label: "Okres wypowiedzenia", type: choice, group: contract, showWhen: "contract-type=probation", options: [{ value: d3, label: "3 dni robocze" }, { value: w1, label: "1 tydzień" }, { value: w2, label: "2 tygodnie" }], hint: "Zależy od długości okresu próbnego: do 2 tygodni – 3 dni robocze, ponad 2 tygodnie – 1 tydzień, 3 miesiące – 2 tygodnie." }
  - { id: end-date-mode, label: "Data rozwiązania umowy w piśmie", type: choice, group: contract, options: [{ value: none, label: "Bez daty" }, { value: date, label: "Podaj datę" }] }
  - { id: end-date, label: "Przewidywana data rozwiązania umowy", type: date, group: contract, showWhen: "end-date-mode=date", hint: "Okres w tygodniach kończy się w sobotę, a w miesiącach ostatniego dnia miesiąca. Przy wypowiedzeniu złożonym w trakcie miesiąca okres miesięczny liczy się od pierwszego dnia następnego miesiąca." }
---

<div class="flex justify-between gap-6 mb-6 text-sm leading-relaxed">
  <div>
    <span data-field="employee-name">[imię i nazwisko pracownika]</span><br>
    <span data-field="employee-address">[adres zamieszkania]</span>
  </div>
  <div class="text-right">
    <span data-field="city">[miejscowość]</span>, dnia <span data-field="date">[data]</span> r.
  </div>
</div>

<div class="mb-8 ml-auto w-1/2 text-sm leading-relaxed">
  <strong>Pracodawca:</strong><br>
  <span data-field="employer-name">[nazwa pracodawcy]</span><br>
  <span data-field="employer-address">[adres siedziby]</span>
</div>

<h2 class="text-center font-bold text-lg my-8 uppercase tracking-wide">Wypowiedzenie umowy o pracę</h2>

<p class="mb-4">
  Na podstawie art. 30 § 1 pkt 2 ustawy z dnia 26 czerwca 1974 r. – Kodeks pracy wypowiadam umowę o pracę zawartą w dniu <span data-field="contract-date">[data zawarcia umowy]</span> r. <span data-choice="contract-type" data-indefinite="na czas nieokreślony" data-fixed="na czas określony" data-probation="na okres próbny">na czas nieokreślony</span>, z zachowaniem okresu wypowiedzenia wynoszącego <span data-show-when="contract-type=indefinite,fixed"><span data-choice="notice-regular" data-w2="2 tygodnie" data-m1="1 miesiąc" data-m3="3 miesiące">2 tygodnie</span></span><span data-show-when="contract-type=probation" class="hidden"><span data-choice="notice-probation" data-d3="3 dni robocze" data-w1="1 tydzień" data-w2="2 tygodnie">3 dni robocze</span></span>.
</p>

<p class="mb-4">
  Umowa rozwiąże się z upływem okresu wypowiedzenia<span data-show-when="end-date-mode=none">.</span><span data-show-when="end-date-mode=date" class="hidden">, tj. z dniem <span data-field="end-date">[data]</span> r.</span>
</p>

<div class="flex justify-end mt-16 text-sm">
  <div class="text-center">
    <div class="border-b border-black w-48 mb-2"></div>
    <span>(czytelny podpis pracownika)</span>
  </div>
</div>

<div class="mt-12 pt-4 border-t border-dashed border-gray-400 text-xs text-gray-700">
  <p class="mb-8">Potwierdzam otrzymanie niniejszego oświadczenia w dniu ......................... r.</p>
  <div class="flex justify-end">
    <div class="text-center">
      <div class="border-b border-black w-48 mb-2"></div>
      <span>(podpis i pieczątka pracodawcy)</span>
    </div>
  </div>
</div>