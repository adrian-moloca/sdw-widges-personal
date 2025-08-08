import { GridFilterItem } from '@mui/x-data-grid-pro';
import { set, has } from 'lodash';
import { QueryOptionsProps } from './types';
import dayjs from 'dayjs';

const initializeSearchPayload = (paginationModel: any, sorting?: any[], query?: any): any => ({
  pagination: {
    rows: paginationModel?.pageSize ?? 25,
    start: (paginationModel?.page ?? 0) * (paginationModel?.pageSize ?? 0),
    total: 0,
  },
  sort: sorting,
  query,
});
export const calculateFilter = (
  queryOptions: QueryOptionsProps,
  paginationModel: any,
  query?: any,
  sorting?: any[]
) => {
  const variables: any = initializeSearchPayload(paginationModel, sorting, query);
  if (
    queryOptions.filterModel?.quickFilterValues &&
    queryOptions.filterModel?.quickFilterValues?.length > 0
  ) {
    set(variables, 'search', queryOptions.filterModel?.quickFilterValues.join(' '));
  }

  if (queryOptions?.sortModel && queryOptions.sortModel.length > 0) {
    const orderBy: any[] = [];
    queryOptions.sortModel.forEach((e: any) =>
      orderBy.push({
        column: e.field,
        operator: e.sort != undefined ? e.sort.toUpperCase() : 'ASC',
      })
    );
    variables.sort = orderBy;
  }

  const { filterModel } = queryOptions;

  if (filterModel) {
    const validFilters = filterModel.items.filter((e: any) => has(e, 'value'));

    if (validFilters.length > 0) {
      let gridFilters: Array<any> = [];
      validFilters.forEach((e: GridFilterItem) => {
        const filters = parseSearchFilter(e);
        if (filters.length > 0) gridFilters = [...gridFilters, ...filters];
      });

      const where = variables.query?.where;
      const operator = (
        filterModel?.logicOperator ? filterModel.logicOperator.toUpperCase() : 'AND'
      ) as any;

      variables.query = {
        operator,
        where: where ? [...where, ...gridFilters] : gridFilters,
      };
    }
  }
  return variables;
};

export const isValidDate = (value: any) => {
  // List of possible date formats to check
  const dateFormats = [
    'YYYY-MM-DD',
    'MM/DD/YYYY',
    'DD-MM-YYYY',
    'YYYY.MM.DD',
    'DD.MM.YYYY',
    'MMM DD, YYYY',
    'DD MMM YYYY',
    // Add more formats as needed
  ];

  // Check if the date is valid with the allowed formats
  const date = dayjs(value, dateFormats, true);

  return date.isValid() && date.isSame(dayjs(date.format('YYYY-MM-DD'), 'YYYY-MM-DD'), 'day');
};
export const parseSearchFilter = (e: GridFilterItem): Array<any> => {
  const columnName = e.field;
  const { operator, value } = e;

  if (value === undefined || (value === null && !['isEmpty', 'isNotEmpty'].includes(operator))) {
    return [];
  }

  const getStringSearchQuery = (val: any, prefix = '', suffix = '') => {
    return val ? [{ column: columnName, value: `${prefix}${val}${suffix}` }] : [];
  };

  const getDateSearchQuery = (val: any, op: any) => {
    if (isValidDate(val)) {
      return [{ column: columnName, value: dayjs(val).format('YYYY-MM-DD'), operator: op }];
    }
    return val ? [{ column: columnName, value: val, operator: op }] : [];
  };

  const getEqualsSearchQuery = (val: any): any[] => {
    if (isValidDate(val)) {
      return [{ column: columnName, value: dayjs(val).format('YYYY-MM-DD') }];
    }
    return val ? [{ column: columnName, value: val }] : [];
  };

  const stringOperators: { [key: string]: (val: any) => any[] } = {
    startsWith: (val) => getStringSearchQuery(val, '', '*'),
    endsWith: (val) => getStringSearchQuery(val, '*', ''),
    contains: (val) => getStringSearchQuery(val, '*', '*'),
    '!=': (val) => (val ? [{ column: columnName, value: val, exclude: true }] : []),
    not: (val) => (val ? [{ column: columnName, value: val, exclude: true }] : []),
    equals: (val) => {
      if (isValidDate(val)) {
        return [{ column: columnName, value: dayjs(val).format('YYYY-MM-DD') }];
      } else if (val) {
        return [{ column: columnName, value: val }];
      }

      return [];
    },
    is: (val) => {
      if (isValidDate(val)) {
        return [{ column: columnName, value: dayjs(val).format('YYYY-MM-DD') }];
      } else if (val) {
        return [{ column: columnName, value: val }];
      }

      return [];
    },
    '=': (val) => {
      if (isValidDate(val)) {
        return [{ column: columnName, value: dayjs(val).format('YYYY-MM-DD') }];
      } else if (val) {
        return [{ column: columnName, value: val }];
      }

      return [];
    },
  };

  const dateOperators: { [key: string]: (val: any) => any[] } = {
    '<': (val) => getDateSearchQuery(val, 'LESS'),
    before: (val) => getDateSearchQuery(val, 'LESS'),
    '<=': (val) => getDateSearchQuery(val, 'LTE'),
    onOrBefore: (val) => getDateSearchQuery(val, 'LTE'),
    '>': (val) => getDateSearchQuery(val, 'GREATER'),
    after: (val) => getDateSearchQuery(val, 'GREATER'),
    '>=': (val) => getDateSearchQuery(val, 'GTE'),
    onOrAfter: (val) => getDateSearchQuery(val, 'GTE'),
  };

  if (stringOperators[operator]) {
    return stringOperators[operator](value);
  }

  if (dateOperators[operator]) {
    return dateOperators[operator](value);
  }

  switch (operator) {
    case 'isEmpty':
      return [{ column: columnName, value: null }];
    case 'isNotEmpty':
      return [{ column: columnName, value: null, exclude: true }];
    case 'isAnyOf':
    default:
      if (!value) return [];

      if (typeof value === 'string' || isValidDate(value)) {
        return getEqualsSearchQuery(value);
      }

      if (value instanceof Array) {
        return [
          {
            column: columnName,
            value: value.map((x: any) => (typeof x === 'string' ? x : x.code)),
            operator: 'OR',
          },
        ];
      }

      return [{ column: columnName, value: value.code.toString(), operator: 'OR' }];
  }
};
