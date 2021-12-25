export interface Error {
  ok: boolean;
  error: string;
}

export enum Days {
  today = '0',
  tomorrow = '1',
}

export interface Data {
  ch_id: string;
  prog: Array<Prog>;
}

export interface Prog {
  s: string;
  db_id: string;
  e: string;
  title: string;
  descr: string;
  img: string;
  g_id: string;
  tip: string;
  article_id?: string;
  rerun: string;
  rating?: string;
  tvg_rating?: string;
  live: string;
  is_premiere: string;
  ei: string;
  is_type: string;
  subgenre: string;
  ch_id: string;
}

export interface EnrichedProg extends Prog {
  channel_logo: string;
  channel_label: string;
  start: string;
  end: string;
  is_passed: boolean;
  progress: number;
}

export interface ProgDetails {
  db_id: string;
  ch_id: string;
  title: string;
  g: string;
  prog_sort: string;
  descr: string;
  year: string;
  dir: string;
  country: string;
  broadcast: string;
  s: string;
  e: string;
  img: string;
  act: string;
  scen: string;
  comp: string;
  rating: string;
  rerun: string;
  g_id: string;
  kijkw: string;
  grouped_id: string;
  tip: string;
  is_premiere: string;
  is_start: string;
  is_last: string;
  live: string;
  is_type: string;
  subgenre: string;
  related: Array<any>;
  ondemand: Array<any>;
  channel_logo: string;
  channel_label: string;
  deep_link: string;
  start: string;
  end: string;
  day: string;
  descr_short: string;
  is_passed: boolean;
  progress: number;
}

