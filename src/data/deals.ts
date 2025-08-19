export type Deal = {
  id: string;
  name: string;
  owner: string;
  stage: 'New' | 'Qualified' | 'Won' | 'Lost';
  status: 'Active' | 'Stalled' | 'Closed';
  amount: number;
  created: string;
  updated: string;
  custom1?: string;
  custom2?: string;
  custom3?: string;
  custom4?: string;
  custom5?: string;
  custom6?: string;
  custom7?: string;
  custom8?: string;
  custom9?: string;
  custom10?: string;
};

export const deals: Deal[] = [
  { id: '1', name: 'Acme Corp', owner: 'Alice', stage: 'New', status: 'Active', amount: 12000, created: '2025-08-01', updated: '2025-08-10', custom1: 'A', custom2: 'B', custom3: 'C', custom4: 'D', custom5: 'E', custom6: 'F', custom7: 'G', custom8: 'H', custom9: 'I', custom10: 'J' },
  { id: '2', name: 'Beta LLC', owner: 'Bob', stage: 'Qualified', status: 'Stalled', amount: 8000, created: '2025-07-15', updated: '2025-08-05', custom1: 'K', custom2: 'L', custom3: 'M', custom4: 'N', custom5: 'O', custom6: 'P', custom7: 'Q', custom8: 'R', custom9: 'S', custom10: 'T' },
  { id: '3', name: 'Gamma Inc', owner: 'Carol', stage: 'Won', status: 'Closed', amount: 25000, created: '2025-06-20', updated: '2025-07-01', custom1: 'U', custom2: 'V', custom3: 'W', custom4: 'X', custom5: 'Y', custom6: 'Z', custom7: 'AA', custom8: 'BB', custom9: 'CC', custom10: 'DD' },
  { id: '4', name: 'Delta Co', owner: 'Dave', stage: 'Lost', status: 'Closed', amount: 0, created: '2025-05-10', updated: '2025-06-01', custom1: 'EE', custom2: 'FF', custom3: 'GG', custom4: 'HH', custom5: 'II', custom6: 'JJ', custom7: 'KK', custom8: 'LL', custom9: 'MM', custom10: 'NN' },
  { id: '5', name: 'Epsilon Ltd', owner: 'Eve', stage: 'Qualified', status: 'Active', amount: 15000, created: '2025-08-02', updated: '2025-08-11', custom1: 'OO', custom2: 'PP', custom3: 'QQ', custom4: 'RR', custom5: 'SS', custom6: 'TT', custom7: 'UU', custom8: 'VV', custom9: 'WW', custom10: 'XX' },
  { id: '6', name: 'Zeta Group', owner: 'Frank', stage: 'New', status: 'Active', amount: 9000, created: '2025-08-03', updated: '2025-08-12', custom1: 'YY', custom2: 'ZZ', custom3: 'AAA', custom4: 'BBB', custom5: 'CCC', custom6: 'DDD', custom7: 'EEE', custom8: 'FFF', custom9: 'GGG', custom10: 'HHH' },
  { id: '7', name: 'Eta Partners', owner: 'Grace', stage: 'Won', status: 'Closed', amount: 30000, created: '2025-07-10', updated: '2025-07-20', custom1: 'III', custom2: 'JJJ', custom3: 'KKK', custom4: 'LLL', custom5: 'MMM', custom6: 'NNN', custom7: 'OOO', custom8: 'PPP', custom9: 'QQQ', custom10: 'RRR' },
  { id: '8', name: 'Theta LLC', owner: 'Heidi', stage: 'Lost', status: 'Closed', amount: 0, created: '2025-06-15', updated: '2025-07-02', custom1: 'SSS', custom2: 'TTT', custom3: 'UUU', custom4: 'VVV', custom5: 'WWW', custom6: 'XXX', custom7: 'YYY', custom8: 'ZZZ', custom9: 'AAAA', custom10: 'BBBB' },
  { id: '9', name: 'Iota Inc', owner: 'Ivan', stage: 'Qualified', status: 'Stalled', amount: 11000, created: '2025-07-18', updated: '2025-08-06', custom1: 'CCCC', custom2: 'DDDD', custom3: 'EEEE', custom4: 'FFFF', custom5: 'GGGG', custom6: 'HHHH', custom7: 'IIII', custom8: 'JJJJ', custom9: 'KKKK', custom10: 'LLLL' },
  { id: '10', name: 'Kappa Co', owner: 'Judy', stage: 'New', status: 'Active', amount: 7000, created: '2025-08-04', updated: '2025-08-13', custom1: 'MMMM', custom2: 'NNNN', custom3: 'OOOO', custom4: 'PPPP', custom5: 'QQQQ', custom6: 'RRRR', custom7: 'SSSS', custom8: 'TTTT', custom9: 'UUUU', custom10: 'VVVV' },
  { id: '11', name: 'Lambda Ltd', owner: 'Karl', stage: 'Qualified', status: 'Active', amount: 16000, created: '2025-08-05', updated: '2025-08-14', custom1: 'WWWW', custom2: 'XXXX', custom3: 'YYYY', custom4: 'ZZZZ', custom5: 'AAAAA', custom6: 'BBBBB', custom7: 'CCCCC', custom8: 'DDDDD', custom9: 'EEEEE', custom10: 'FFFFF' },
  { id: '12', name: 'Mu Group', owner: 'Laura', stage: 'Won', status: 'Closed', amount: 27000, created: '2025-07-12', updated: '2025-07-22', custom1: 'GGGGG', custom2: 'HHHHH', custom3: 'IIIII', custom4: 'JJJJJ', custom5: 'KKKKK', custom6: 'LLLLL', custom7: 'MMMMM', custom8: 'NNNNN', custom9: 'OOOOO', custom10: 'PPPPP' },
  { id: '13', name: 'Nu Partners', owner: 'Mallory', stage: 'Lost', status: 'Closed', amount: 0, created: '2025-06-18', updated: '2025-07-03', custom1: 'QQQQQ', custom2: 'RRRRR', custom3: 'SSSSS', custom4: 'TTTTT', custom5: 'UUUUU', custom6: 'VVVVV', custom7: 'WWWWW', custom8: 'XXXX', custom9: 'YYYYY', custom10: 'ZZZZZ' },
  { id: '14', name: 'Xi LLC', owner: 'Niaj', stage: 'Qualified', status: 'Stalled', amount: 10500, created: '2025-07-19', updated: '2025-08-07', custom1: 'AAAAAA', custom2: 'BBBBBB', custom3: 'CCCCCC', custom4: 'DDDDDD', custom5: 'EEEEEE', custom6: 'FFFFFF', custom7: 'GGGGGG', custom8: 'HHHHHH', custom9: 'IIIIII', custom10: 'JJJJJJ' },
  { id: '15', name: 'Omicron Inc', owner: 'Olivia', stage: 'New', status: 'Active', amount: 9500, created: '2025-08-06', updated: '2025-08-15', custom1: 'KKKKKK', custom2: 'LLLLLL', custom3: 'MMMMMM', custom4: 'NNNNNN', custom5: 'OOOOOO', custom6: 'PPPPPP', custom7: 'QQQQQQ', custom8: 'RRRRRR', custom9: 'SSSSSS', custom10: 'TTTTTT' },
  { id: '16', name: 'Pi Co', owner: 'Peggy', stage: 'Qualified', status: 'Active', amount: 17000, created: '2025-08-07', updated: '2025-08-16', custom1: 'UUUUUU', custom2: 'VVVVVV', custom3: 'WWWWWW', custom4: 'XXXXXX', custom5: 'YYYYYY', custom6: 'ZZZZZZ', custom7: 'AAAAAAA', custom8: 'BBBBBBB', custom9: 'CCCCCCC', custom10: 'DDDDDDD' },
  { id: '17', name: 'Rho Ltd', owner: 'Quentin', stage: 'Won', status: 'Closed', amount: 32000, created: '2025-07-14', updated: '2025-07-24', custom1: 'EEEEEEE', custom2: 'FFFFFFF', custom3: 'GGGGGGG', custom4: 'HHHHHHH', custom5: 'IIIIIII', custom6: 'JJJJJJJ', custom7: 'KKKKKKK', custom8: 'LLLLLLL', custom9: 'MMMMMMM', custom10: 'NNNNNNN' },
  { id: '18', name: 'Sigma Group', owner: 'Rupert', stage: 'Lost', status: 'Closed', amount: 0, created: '2025-06-20', updated: '2025-07-04', custom1: 'OOOOOOO', custom2: 'PPPPPPP', custom3: 'QQQQQQQ', custom4: 'RRRRRRR', custom5: 'SSSSSSS', custom6: 'TTTTTTT', custom7: 'UUUUUUU', custom8: 'VVVVVVV', custom9: 'WWWWWWW', custom10: 'XXXXXXX' },
  { id: '19', name: 'Tau Partners', owner: 'Sybil', stage: 'Qualified', status: 'Stalled', amount: 11500, created: '2025-07-21', updated: '2025-08-08', custom1: 'YYYYYYY', custom2: 'ZZZZZZZ', custom3: 'AAAAAAAA', custom4: 'BBBBBBBB', custom5: 'CCCCCCCC', custom6: 'DDDDDDDD', custom7: 'EEEEEEEE', custom8: 'FFFFFFFF', custom9: 'GGGGGGGG', custom10: 'HHHHHHHH' },
  { id: '20', name: 'Upsilon LLC', owner: 'Trent', stage: 'New', status: 'Active', amount: 8000, created: '2025-08-08', updated: '2025-08-17', custom1: 'IIIIIIII', custom2: 'JJJJJJJJ', custom3: 'KKKKKKKK', custom4: 'LLLLLLLL', custom5: 'MMMMMMMM', custom6: 'NNNNNNNN', custom7: 'OOOOOOOO', custom8: 'PPPPPPPP', custom9: 'QQQQQQQQ', custom10: 'RRRRRRRR' },
];
