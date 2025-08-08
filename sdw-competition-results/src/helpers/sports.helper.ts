import { formatMasterCode } from 'helpers';
import orderBy from 'lodash/orderBy';
import disciplines from 'resources/disciplines-min';

export const formatDisciplineList = (input?: any[]) => {
  if (!input) return [];
  const data = input.map(
    (x: any) => ({
      ...x,
      display: `${getDisciplineDirectCode(x.sportDisciplineId, x.title)} - ${x.title}`,
    }),
    'display'
  );
  return orderBy(data, 'title');
};

export function getDisciplineDirectCode(code: string, title?: string) {
  let result = formatMasterCode(code);
  const discipline = disciplines.sports.find((x: any) => x.code === result);
  if (discipline) return result;
  if (result.startsWith('SDC-')) {
    result = disciplines.sports.find((x: any) => x.name === title)?.code ?? 'ATH';
  }
  return result;
}
export const getDisciplineTitle = (code: string) => {
  const result = formatMasterCode(code);
  const discipline = disciplines.sports.find((x: any) => x.code === result);
  return discipline?.name;
};
export function getDisciplineCode(code: string, title?: string) {
  let result = formatMasterCode(code);
  if (result == 'GYM' || result == 'ART') return 'GAR';
  if (result == 'MIX' || result == 'DSR' || result == 'AAT') return 'ATH';
  if (result == 'ARC-O' || result == 'ARC-F' || result == 'ARC-I' || result == 'ARC-D')
    return 'ARC';
  if (result == 'RHK' || result == 'HK5') return 'HOC';
  if (result == 'IH3' || result == 'ISS') return 'IHO';
  if (result == 'BWL' || result == 'JDP') return 'HBL';
  if (result == 'RGS' || result == 'AFB') return 'RU7';
  if (result == 'BLN' || result == 'BLS' || result == 'KFB') return 'BOB';
  if (result == 'BTL' || result == 'LSR' || result == 'TTL') return 'MPN';
  if (result == 'API') return 'SBD';
  if (result == 'CRO') return 'CRI';
  if (result == 'MSP') return 'SMT';
  if (result == 'BDY') return 'IHO';
  if (result == 'EDV' || result == 'EVA') return 'EQU';
  if (result == 'MCS') return 'BMX';
  if (result == 'SUM') return 'WRE';
  if (result == 'KYU') return 'KEN';
  if (result == 'FFG') return 'SHO';
  if (result == 'SPS') return 'SSK';
  if (result == 'FSH') return 'SWM';
  if (result == 'AUT') return 'BMF';
  if (result == 'CMA') return 'CSP';
  if (result == 'GLM') return 'WRE';
  if (result == 'WSK') return 'SRF';
  if (result == 'KEN' || result == 'WUS') return 'TKW';
  if (result == 'ACB') return 'WRE';
  if (result == 'ARF') return 'FBL';
  if (result == 'FTS') return 'FBL';
  if (result == 'SOF') return 'BSB';
  if (result?.startsWith('SDC-')) {
    return disciplines.sports.find((x: any) => x.name === title)?.code ?? 'ATH';
  }
  return 'ATH';
}
