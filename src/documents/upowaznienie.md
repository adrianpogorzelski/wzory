---
title: "Upoważnienie do odbioru dokumentów"
categories: ["Administracja"]
description: "Upoważnienie dla osoby trzeciej do odbioru dokumentów w Twoim imieniu, jednorazowe lub na wskazany czas."
groups:
  - id: authorizing
    title: "Osoba upoważniająca"
    description: "Osoba, która udziela upoważnienia do odbioru dokumentów w jej imieniu."
  - id: authorized
    title: "Osoba upoważniona"
    description: "Osoba, która ma odebrać dokumenty w imieniu osoby upoważniającej."
  - id: scope
    title: "Zakres upoważnienia"
    description: "Jakie dokumenty ma odebrać osoba upoważniona, gdzie oraz na jak długo upoważnienie obowiązuje."
fields:
  - { id: city, label: "Miejscowość", placeholder: "np. Warszawa" }
  - { id: date, label: "Data", type: date, default: today }
  - { id: authorizing-person, label: "Imię i nazwisko", group: authorizing, placeholder: "np. Jan Kowalski" }
  - { id: authorizing-address, label: "Adres zamieszkania", group: authorizing, placeholder: "np. ul. Długa 5/12, 00-001 Warszawa" }
  - { id: authorizing-pesel, label: "PESEL", group: authorizing, placeholder: "11 cyfr", inputmode: numeric, maxlength: 11 }
  - { id: authorizing-id, label: "Seria i numer dokumentu", group: authorizing, placeholder: "np. ABC 123456" }
  - { id: authorizing-id-kind, label: "Rodzaj dokumentu", type: choice, group: authorizing, options: [{ value: card, label: "Dowód osobisty" }, { value: passport, label: "Paszport" }] }

  - { id: authorized-person, label: "Imię i nazwisko", type: person, group: authorized, placeholder: "np. Anna Nowak" }
  - { id: authorized-pesel, label: "PESEL", group: authorized, placeholder: "11 cyfr", inputmode: numeric, maxlength: 11 }
  - { id: authorized-id, label: "Seria i numer dokumentu", group: authorized, placeholder: "np. ABC 123456" }
  - { id: authorized-id-kind, label: "Rodzaj dokumentu", type: choice, group: authorized, options: [{ value: card, label: "Dowód osobisty" }, { value: passport, label: "Paszport" }] }

  - { id: documents, label: "Rodzaj dokumentów", type: list, group: scope, placeholder: "np. zaświadczenie o zarobkach" }
  - { id: institution, label: "Miejsce odbioru (instytucja)", group: scope, placeholder: "np. Urząd Miasta" }
  - { id: validity-mode, label: "Termin ważności", type: choice, group: scope, options: [{ value: once, label: "Jednorazowo" }, { value: until, label: "Do dnia…" }] }
  - { id: validity-date, label: "Ważne do dnia", type: date, group: scope, showWhen: "validity-mode=until" }
---

<div class="flex justify-end mb-8 text-sm">
  <span><span data-field="city">[Miejscowość]</span>, dnia <span data-field="date">[Data]</span> r.</span>
</div>

<div class="mb-8 text-sm leading-relaxed">
  <strong>Osoba upoważniająca:</strong><br>
  <span data-field="authorizing-person">[imię i nazwisko]</span><br>
  <span data-field="authorizing-address">[adres zamieszkania]</span><br>
  PESEL: <span data-field="authorizing-pesel">[PESEL]</span><br>
  <span data-choice="authorizing-id-kind" data-card="dowód osobisty" data-passport="paszport">dowód osobisty</span> (seria i numer): <span data-field="authorizing-id">[seria i numer]</span>
</div>

<h2 class="text-center font-bold text-lg my-6 uppercase tracking-wide">Upoważnienie do odbioru dokumentów</h2>

<p class="mb-4">
  Niniejszym upoważniam
  <span data-gender="authorized-person" data-m="pana" data-f="panią" data-print="panią/pana">[forma grzecznościowa]</span>
  <strong data-field="authorized-person" data-case="acc">[imię i nazwisko osoby upoważnionej]</strong>,
  <span data-gender="authorized-person" data-m="legitymującego się" data-f="legitymującą się" data-print="legitymującego/ą się">legitymującego/ą się</span>
  <span data-choice="authorized-id-kind" data-card="dowodem osobistym" data-passport="paszportem">dowodem osobistym</span>
  o serii i numerze <span data-field="authorized-id">[seria i numer]</span>
  (PESEL: <span data-field="authorized-pesel">[PESEL]</span>),
  do odbioru w moim imieniu następujących dokumentów:
</p>

<ul data-list="documents" class="mb-4"><li>[rodzaj dokumentu]</li></ul>

<p class="mb-4">
  Miejsce odbioru dokumentów: <span data-field="institution">[instytucja]</span>.
</p>

<p class="mb-4">
  Upoważnienie jest ważne
  <span data-choice="validity-mode" data-once="jednorazowo." data-until="do dnia">jednorazowo.</span><span data-show-when="validity-mode=until" class="hidden"> <span data-field="validity-date">[data]</span> r.</span>
</p>

<div class="flex justify-end mt-16 pt-8 text-sm">
  <div class="text-center">
    <div class="border-b border-black w-48 mb-2"></div>
    <span>(czytelny podpis osoby upoważniającej)</span>
  </div>
</div>