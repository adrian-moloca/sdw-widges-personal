import { TypographyVariant } from '@mui/material';

export enum EntityType {
  Person,
  Horse,
  Event,
  Competition,
  Discipline,
  Venue,
  Stage,
  Phase,
  Team,
  Unit,
  SubUnit,
  Result,
  Participant,
  Competitor,
  ParticipantCompetition,
  Organization,
  Noc,
  Record,
  Official,
  Category,
  Entry,
  Award,
  Mapping,
  Translation,
  ScheduleItem,
}
export type Nullable<T> = T | null | undefined;
export interface IConfigProps {
  type: EntityType;
  display: string;
  displayPlural: string;
  entityName: string;
  apiNode: string;
  path: string;
  displayAccessor: string;
  parentPath?: string;
}
export type IConfigurationProps = {
  [key in EntityType]: IConfigProps;
};

export type IMetadataDataEntity = {
  key: EntityType;
  model: { [key: string]: MetadataModel };
};
export interface IMetadataState {
  data: Array<IMetadataDataEntity>;
  hidden: Array<string>;
  hasHidden: boolean;
}
export type IMetaType = { [key: string]: MetadataModel };
export type MetaFieldType =
  | 'Enum'
  | 'String'
  | 'Collection'
  | 'Date'
  | 'Number'
  | 'Boolean'
  | 'Map';
export type MetaFieldSpecial = 'Type' | 'Extension' | 'Binary' | 'Reference' | 'Id';
export type MetaFieldEntity = 'Person' | 'Horse';
export type MetadataOption = {
  value: string;
  displayName: string;
};
export type MetadataModel = {
  name: string;
  displayName: string;
  fieldType: string;
  type: MetaFieldType;
  options: MetadataOption[];
  special: MetaFieldSpecial[];
  readonly: boolean;
  system: boolean;
  required: boolean;
  isSearchable: boolean;
  hidable: boolean;
  allowFiltering: boolean;
  constraints: any[];
  unit?: string;
  entity?: string;
  reference?: string;
  dbName?: string;
};
export type MedalColor = 'golden' | 'silver' | 'bronze';
export type MedalType = 'golden' | 'silver' | 'bronze';
export interface TCardProps {
  data: any;
  discipline: string;
  showTitle: boolean;
  defaultExpanded?: boolean;
}
export interface ILink {
  href: string;
  method: string;
  rel: 'phase_units' | 'phase';
}
export interface ColumnData {
  dataKey: string;
  label: string;
  command?: boolean;
  width?: number;
  minWidth?: number;
  flex?: number;
  align?: 'left' | 'center' | 'right';
}
export interface ResultProps {
  data: any;
  dataset: Array<any>;
  field?: string;
  direct?: boolean;
}
export type KpiDataProps = {
  value: string;
  title: string;
};
export type Participant = {
  phaseId: string;
  opponentId1: string;
  opponentId2: string;
  order: number;
};

export type PhaseBrackets = {
  mappings: Participant[];
  competitors: any[];
};

export interface IIconChipProps {
  id?: string;
  code: string;
  hideTitle: boolean;
  title?: string;
  prefix?: string;
  typoSize?: TypographyVariant;
  size?: 'tiny' | 'small' | 'medium' | 'standard' | 'large' | 'xlarge';
  sizeNumber?: number;
  route?: Nullable<string>;
  onClick?: () => void;
}
export interface RCProps {
  data: any;
  discipline: string;
  frames?: Array<any>;
}
export interface IQueryProps {
  queryKey: string;
  url: string;
}
export interface IDisplayProps {
  id: string;
  display: string | undefined;
}
export interface IParameter extends IDisplayProps {
  type: EntityType;
}
export interface IParameterList {
  name: string;
  value: any;
}
export interface IPanelTabProps {
  data: any;
  parameter: IParameter;
  parameters?: IParameterList[];
  readOnly?: boolean;
  includeHeader?: boolean;
}
export type ExtendedResultMetric = {
  field: string;
  label: string;
  width?: number;
};
