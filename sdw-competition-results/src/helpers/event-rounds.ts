import { ROUNDS } from 'config/sportConfig';
import { isNullOrEmpty } from 'helpers';
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
import uniqBy from 'lodash/uniqBy';
import { Entry } from 'models';

export const getRoundTitle = (row: any, roundTypes: Array<Entry>, stageTypes: Array<Entry>) => {
  let round = get(row, 'round');
  if (round) {
    if (round === 'RTYP$8') {
      round = 'RTYP$8F';
    }

    const value = roundTypes.find((x: any) => x.key === round);
    const roundTitle = value?.value;

    return roundTitle ?? normalizeTitle(row.title).trim();
  } else {
    const value = stageTypes?.find((x: any) => x.key === row.stageType);
    return value?.value ?? normalizeTitle(row.title).trim();
  }
};

export const containsIgnoreCase = (mainString?: string, searchString?: string): boolean => {
  if (!mainString || !searchString) {
    return false;
  }

  // Handle null/undefined cases
  return normalizeTitle(mainString)
    .toLowerCase()
    .includes(normalizeTitle(searchString).toLowerCase());
};

export const normalizeTitle = (input: string) => {
  if (!input) {
    return input;
  }

  const result = input
    .replaceAll("Women's Individual - ", '')
    .replaceAll("Men's Individual - ", '')
    .replaceAll("Women's Individual", '')
    .replaceAll("Men's Individual", '')
    .replaceAll("Women's Team", '')
    .replaceAll('Stage', '')
    .replaceAll('stage', '')
    .replaceAll("Men's Team", '')
    .replaceAll('Mixed Team', '')
    .replaceAll("Women's", '')
    .replaceAll("Men's", '')
    .replaceAll('Women', '')
    .replaceAll('Men', '')
    .replaceAll(',', ' ')
    .replaceAll('  ', ' ')
    .replace('Grp', 'Group')
    .trim()
    .replace(/^[,.]+/, '');

  if (!result) {
    return input;
  }

  return result;
};

export const processResults = (dataContent: any) => {
  if (dataContent.length === 0 || !dataContent?.rounds || dataContent?.rounds.length === 0) {
    return [];
  }
  const groupedData = groupBy(dataContent?.rounds, 'usdmType');
  const result: Array<any> = [];

  Object.keys(groupedData).forEach((usdmType: string) => {
    switch (usdmType) {
      case ROUNDS.UNIT_TYPE:
      case ROUNDS.PHASE_TYPE:
        {
          const hasStages = groupedData[usdmType].filter((x: any) => x.stage).length > 0;

          if (hasStages) {
            const stages = uniqBy(
              groupedData[usdmType].filter((x: any) => x.stage).map((x: any) => x.stage),
              'id'
            );
            result.push(...stages);

            const remainingRounds = groupedData[usdmType].filter((x: any) => !x.stage);
            if (remainingRounds.length > 0) {
              result.push(...remainingRounds);
            }
          } else {
            result.push(...groupedData[usdmType]);
          }
        }
        break;
      default:
        result.push(...groupedData[usdmType]);
        break;
    }
  });

  return result;
};
export const getChipColor = (value: string) => {
  switch (value) {
    case 'SC_WLT$L':
    case 'SC_QUMARK$DNF':
    case 'LOST':
      return 'error';
    case 'SC_WLT$W':
    case 'WON':
      return 'success';
    default:
      return 'secondary';
  }
};
export const ValidateResult = (param: { dataset: Array<any>; field: string; direct?: boolean }) => {
  const data = param.dataset;
  const field = param.field;
  return param.direct === true
    ? {
        hasRank: data.filter((element: any) => get(element, `rank`) != undefined)?.length > 0,
        hasResult:
          data.filter(
            (element: any) =>
              get(element, `value`) != undefined ||
              get(element, `extendedInfo.extendedRanking.value`)
          )?.length > 0,
        hasIrm: data.filter((element: any) => get(element, `irm`) != undefined)?.length > 0,
        hasDiff: data.filter((element: any) => get(element, `diff`))?.length > 0,
        hasFor: data.filter((element: any) => get(element, `for`))?.length > 0,
        hasAgainst: data.filter((element: any) => get(element, `against`))?.length > 0,
        hasWlt: data.filter((element: any) => get(element, `wlt`) != undefined)?.length > 0,
        hasLost: data.filter((element: any) => get(element, `lost`) != undefined)?.length > 0,
        hasPlayed: data.filter((element: any) => get(element, `played`) != undefined)?.length > 0,
        hasWon: data.filter((element: any) => get(element, `won`) != undefined)?.length > 0,
        hasTied: data.filter((element: any) => get(element, `tied`) != undefined)?.length > 0,
        hasPenalty: data.filter((element: any) => get(element, `penalty`) != undefined)?.length > 0,
        hasSubResults:
          data.filter((element: any) => get(element, `result.results`)?.length > 0)?.length > 0,
        maxSubResultsLength: Math.max(
          ...data.map((x: any) => get(x, `result.results`)?.length ?? 0)
        ),
        hasQualification:
          data.filter((element: any) => !isNullOrEmpty(get(element, `qualificationMark`)))?.length >
          0,
        hasPoints:
          data.filter((element: any) => get(element, `extendedInfo.overallRanking.points`))
            ?.length > 0,
        hasOverallPoints:
          data.filter(
            (element: any) => get(element, `extendedInfo.overallRanking.overallPoints`) != undefined
          )?.length > 0,
        hasOverallRank:
          data.filter(
            (element: any) => get(element, `extendedInfo.overallRanking.overallRank`) != undefined
          )?.length > 0,
        hasLastRound:
          data.filter((element: any) => get(element, `lastRound`) != undefined)?.length > 0,
      }
    : {
        hasRank:
          data.filter((element: any) => get(element, `${field}.rank`) != undefined)?.length > 0,
        hasResult:
          data.filter(
            (element: any) =>
              get(element, `${field}.value`) != undefined ||
              get(element, `${field}.extendedInfo.extendedRanking.value`) != undefined
          )?.length > 0,
        hasLastRound:
          data.filter((element: any) => get(element, `${field}.lastRound`) != undefined)?.length >
          0,
        hasIrm:
          data.filter((element: any) => get(element, `${field}.irm`) != undefined)?.length > 0,
        hasDiff: data.filter((element: any) => get(element, `${field}.diff`))?.length > 0,
        hasFor: data.filter((element: any) => get(element, `${field}.for`))?.length > 0,
        hasAgainst: data.filter((element: any) => get(element, `${field}.against`))?.length > 0,
        hasWlt:
          data.filter((element: any) => get(element, `${field}.wlt`) != undefined)?.length > 0,
        hasLost:
          data.filter((element: any) => get(element, `${field}.lost`) != undefined)?.length > 0,
        hasPlayed:
          data.filter((element: any) => get(element, `${field}.played`) != undefined)?.length > 0,
        hasWon:
          data.filter((element: any) => get(element, `${field}.won`) != undefined)?.length > 0,
        hasTied:
          data.filter((element: any) => get(element, `${field}.tied`) != undefined)?.length > 0,
        hasPenalty:
          data.filter((element: any) => get(element, `${field}.penalty`) != undefined)?.length > 0,
        hasQualification:
          data.filter((element: any) => !isNullOrEmpty(get(element, `${field}.qualificationMark`)))
            ?.length > 0,
        hasSubResults:
          data.filter((element: any) => get(element, `${field}.results`)?.length > 0)?.length > 0,
        maxSubResultsLength: Math.max(
          ...data.map((x: any) => get(x, `${field}.results`)?.length ?? 0)
        ),
        hasPoints:
          data.filter(
            (element: any) =>
              get(element, `${field}.extendedInfo.overallRanking.points`) != undefined
          )?.length > 0,
        hasOverallPoints:
          data.filter(
            (element: any) =>
              get(element, `${field}.extendedInfo.overallRanking.overallPoints`) != undefined
          )?.length > 0,
        hasOverallRank:
          data.filter(
            (element: any) =>
              get(element, `${field}.extendedInfo.overallRanking.overallRank`) != undefined
          )?.length > 0,
      };
};
