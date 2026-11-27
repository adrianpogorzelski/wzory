export type Getter = (name: string) => string;

export interface CalcResult {
  set?: Record<string, string>;    // pola do ustawienia (radio: wartość opcji, data: RRRR-MM-DD)
  output?: Record<string, string>; // teksty do pól typu "note"
}

interface Notice {
  id: string;
  label: string;
  weeks?: number;
  months?: number;
}

const REGULAR: Notice[] = [
  { id: 'w2', label: '2 tygodnie', weeks: 2 },
  { id: 'm1', label: '1 miesiąc', months: 1 },
  { id: 'm3', label: '3 miesiące', months: 3 },
];

// staż (w miesiącach), po którym obowiązuje dłuższy okres wypowiedzenia
const TENURE_STEPS = [6, 36];

const REASONS = [
  'Staż u pracodawcy (wliczając okres wypowiedzenia) jest krótszy niż 6 miesięcy.',
  'Staż u pracodawcy (wliczając okres wypowiedzenia) wynosi co najmniej 6 miesięcy, ale mniej niż 3 lata.',
  'Staż u pracodawcy (wliczając okres wypowiedzenia) wynosi co najmniej 3 lata.',
];

const PROBATION: Record<string, Notice> = {
  w1: { id: 'w1', label: '1 tydzień', weeks: 1 },
  w2: { id: 'w2', label: '2 tygodnie', weeks: 2 },
};

const parseISO = (s: string): Date | null => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : null;
};

const toISO = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);

function addMonths(d: Date, n: number): Date {
  const first = new Date(d.getFullYear(), d.getMonth() + n, 1);
  const lastDay = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
  return new Date(first.getFullYear(), first.getMonth(), Math.min(d.getDate(), lastDay));
}

const format = (d: Date) => d.toLocaleDateString('pl-PL');

// ostatni dzień okresu wypowiedzenia
function endOfNotice(delivery: Date, notice: Notice): Date {
  if (notice.weeks) {
    // bieg od pierwszej niedzieli po dniu złożenia, koniec w sobotę
    const toSunday = (7 - delivery.getDay()) % 7 || 7;
    return addDays(delivery, toSunday + notice.weeks * 7 - 1);
  }
  // miesiące: bieg od 1. dnia następnego miesiąca, koniec ostatniego dnia miesiąca
  return new Date(delivery.getFullYear(), delivery.getMonth() + notice.months! + 1, 0);
}

// czy staż od `start` osiąga `months` miesięcy najpóźniej w dniu `end` (łącznie z tym dniem)
const tenureReaches = (start: Date, months: number, end: Date) => end >= addDays(addMonths(start, months), -1);

function terminationNotice(get: Getter): CalcResult {
  if (get('auto-notice') !== 'yes') return {};

  const note = (text: string, set?: Record<string, string>): CalcResult => ({
    set,
    output: { 'notice-summary': text },
  });

  const delivery = parseISO(get('date'));
  if (!delivery) return note('Podaj datę złożenia wypowiedzenia.');

  if (get('contract-type') === 'probation') {
    const notice = PROBATION[get('notice-probation')];
    if (!notice) {
      return note(
        'Przy 3 dniach roboczych liczą się dni robocze (soboty tak, niedziele i święta nie). Wyłącz wyliczanie i wpisz datę rozwiązania umowy ręcznie.',
        { 'end-date': '' }
      );
    }
    const end = endOfNotice(delivery, notice);
    return note(`Okres wypowiedzenia: ${notice.label}. Umowa rozwiąże się z dniem ${format(end)}.`, {
      'end-date': toISO(end),
    });
  }

  // umowa na czas nieokreślony lub określony: okres zależy od stażu u pracodawcy
  const start = parseISO(get('tenure-start')) ?? parseISO(get('contract-date'));
  if (!start) return note('Podaj datę zawarcia umowy, a wyliczymy okres wypowiedzenia.');
  if (start > delivery) return note('Data zawarcia umowy nie może być późniejsza niż data złożenia wypowiedzenia.');

  let level = 0;
  let end = endOfNotice(delivery, REGULAR[0]);
  while (level < TENURE_STEPS.length && tenureReaches(start, TENURE_STEPS[level], end)) {
    level++;
    end = endOfNotice(delivery, REGULAR[level]);
  }

  return note(
    `${REASONS[level]} Okres wypowiedzenia: ${REGULAR[level].label}. Umowa rozwiąże się z dniem ${format(end)}.`,
    { 'notice-regular': REGULAR[level].id, 'end-date': toISO(end) }
  );
}

export const calculators: Record<string, (get: Getter) => CalcResult> = {
  'termination-notice': terminationNotice,
};