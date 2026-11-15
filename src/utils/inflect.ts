export type Case = 'gen' | 'dat' | 'acc' | 'ins' | 'loc';
export type Gender = 'f' | 'm';

const IDX: Record<Case, number> = { gen: 1, dat: 2, acc: 3, ins: 4, loc: 5 };
const PARTICLES = new Set(['von', 'van', 'de', 'der', 'di', 'da', 'del', 'la', 'le', 'ter', 'ten', 'bin', 'al']);
const MALE_A_NAMES = new Set(['kuba', 'barnaba', 'bonawentura', 'jarema', 'kosma', 'nikita']);

// Rzeczowniki na -a (imiona i nazwiska, oba rodzaje): wzorzec, gen, dat, acc, ins, loc
const A_NOUNS: Array<[RegExp, string, string, string, string, string]> = [
  [/((?:[szcn]|dz))ia$/, '$1i', '$1i', '$1ię', '$1ią', '$1i'],          // Basia, Ania
  [/ia$/, 'ii', 'ii', 'ię', 'ią', 'ii'],                                  // Maria, Julia
  [/([bcdfghklmnprstwz])ja$/, '$1ji', '$1ji', '$1ję', '$1ją', '$1ji'],    // Patrycja
  [/ja$/, 'i', 'i', 'ję', 'ją', 'i'],                                     // Maja
  [/ka$/, 'ki', 'ce', 'kę', 'ką', 'ce'],                                  // Agnieszka
  [/ga$/, 'gi', 'dze', 'gę', 'gą', 'dze'],                                // Jadwiga
  [/ra$/, 'ry', 'rze', 'rę', 'rą', 'rze'],                                // Barbara
  [/ta$/, 'ty', 'cie', 'tę', 'tą', 'cie'],                                // Beata
  [/da$/, 'dy', 'dzie', 'dę', 'dą', 'dzie'],                              // Wanda
  [/ła$/, 'ły', 'le', 'łę', 'łą', 'le'],
  [/la$/, 'li', 'li', 'lę', 'lą', 'li'],                                  // Ola, Urszula
  [/([nmpbwsf])a$/, '$1y', '$1ie', '$1ę', '$1ą', '$1ie'],                 // Anna, Ewa, Teresa
  [/(?<![srcd])za$/, 'zy', 'zie', 'zę', 'zą', 'zie'],                     // Iza
];

// Nazwiska przymiotnikowe
const FEM_ADJ: Record<Case, string> = { gen: 'iej', dat: 'iej', acc: 'ą', ins: 'ą', loc: 'iej' };
const MALE_ADJ = {
  y: { gen: 'ego', dat: 'emu', acc: 'ego', ins: 'ym', loc: 'ym' },
  i: { gen: 'iego', dat: 'iemu', acc: 'iego', ins: 'im', loc: 'im' },
} as const;

function locative(stem: string): string {
  const rules: Array<[RegExp, string]> = [
    [/(sz|cz|rz|dz|dż|ch|[kgjlcż])$/, '$1u'], // Tomaszu, Marku, Andrzeju
    [/r$/, 'rze'], [/t$/, 'cie'], [/d$/, 'dzie'], [/ł$/, 'le'],
    [/([nmpbwsfz])$/, '$1ie'],                // Janie, Adamie
  ];
  for (const [re, rep] of rules) if (re.test(stem)) return stem.replace(re, rep);
  return stem + 'u';
}

// Mężczyźni, końcówka spółgłoskowa: Jan, Nowak, Mazur
function declineMale(word: string, c: Case): string {
  // ruchome „e": Marek → Marka, Kowalec → Kowalca, Paweł → Pawła
  const stem = word.length > 3 ? word.replace(/([^aeiouyąęó])e([kcł])$/, '$1$2') : word;
  switch (c) {
    case 'gen':
    case 'acc': return stem + 'a';
    case 'dat': return stem + 'owi';
    case 'ins': return stem + (/[kg]$/.test(stem) ? 'iem' : 'em');
    case 'loc': return locative(stem);
  }
}

function declineWord(w: string, gender: Gender, c: Case): string {
  if (gender === 'f' && /(sk|ck|dzk)a$/.test(w)) return w.slice(0, -1) + FEM_ADJ[c];

  if (gender === 'm' && /[^aeiouyąęó][yi]$/.test(w)) {
    const end = w.slice(-1) as 'y' | 'i';
    return w.slice(0, -1) + MALE_ADJ[end][c];
  }

  if (w.endsWith('a')) {
    const row = A_NOUNS.find(([re]) => re.test(w));
    return row ? w.replace(row[0], row[IDX[c]] as string) : w;
  }

  if (gender === 'm' && /[bcdfghjklłmnprstwz]$/.test(w)) return declineMale(w, c);

  return w; // nieznany wzorzec lub nazwisko żeńskie na spółgłoskę: bez zmian
}

export function guessGender(fullName: string): Gender {
  const first = fullName.trim().split(/\s+/)[0]?.toLowerCase() ?? '';
  return first.endsWith('a') && !MALE_A_NAMES.has(first) ? 'f' : 'm';
}

export function declineName(full: string, gender: Gender, c: Case): string {
  const decline = (w: string) => {
    const lower = w.toLowerCase();
    if (PARTICLES.has(lower)) return w;
    const out = declineWord(lower, gender, c);
    if (w.length > 1 && w === w.toUpperCase()) return out.toUpperCase();
    return w[0] === w[0].toUpperCase() ? out[0].toUpperCase() + out.slice(1) : out;
  };
  return full
    .trim()
    .split(/\s+/)
    .map((part) => part.split('-').map(decline).join('-'))
    .join(' ');
}