---
title: "Upoważnienie do odbioru dokumentów"
category: "Administracja"
description: "Jednorazowe upoważnienie dla osoby trzeciej do odbioru korespondencji."
groups:
  - id: authorizing
    title: "Osoba upoważniająca"
    description: "Osoba, która udziela upoważnienia do odbioru dokumentów w jej imieniu."
  - id: authorized
    title: "Osoba upoważniona"
    description: "Osoba, która ma odebrać dokumenty w imieniu osoby upoważniającej."
fields:
  - { id: city, label: "Miejscowość", placeholder: "np. Warszawa" }
  - { id: date, label: "Data", type: date }
  - { id: authorizing-person, label: "Imię i nazwisko", group: authorizing, placeholder: "np. Jan Kowalski" }
  - { id: authorized-person, label: "Imię i nazwisko", type: person, group: authorized, placeholder: "np. Anna Nowak" }
---

<div class="flex justify-end mb-8 text-sm">
  <span><span data-field="city">[Miejscowość]</span>, dnia <span data-field="date">[Data]</span> r.</span>
</div>

<div class="mb-8 text-sm">
  <strong>Osoba upoważniająca:</strong><br>
  <span data-field="authorizing-person">[Imię i Nazwisko osoby upoważniającej]</span>
</div>

<h2 class="text-center font-bold text-lg my-6 uppercase tracking-wide">UPOWAŻNIENIE</h2>

<p class="mb-4">
  Niniejszym upoważniam <span data-honorific="authorized-person">[płeć]</span> <strong data-field="authorized-person" data-case="acc">[Imię i Nazwisko osoby upoważnionej]</strong> do odbioru przysługujących mi dokumentów w moim imieniu.
</p>

<div class="flex justify-end mt-16 pt-8 text-sm">
  <div class="text-center">
    <div class="border-b border-black w-48 mb-2"></div>
    <span>(podpis mocodawcy)</span>
  </div>
</div>