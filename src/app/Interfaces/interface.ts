export interface cdnjs {
  exhaustive:          Exhaustive;
  exhaustiveNbHits:    boolean;
  exhaustiveTypo:      boolean;
  hits:                Hit[];
  hitsPerPage:         number;
  nbHits:              number;
  nbPages:             number;
  page:                number;
  params:              string;
  processingTimeMS:    number;
  processingTimingsMS: ProcessingTimingsMS;
  query:               Query;
  serverTimeMS:        number;
 }
 
 export interface Exhaustive {
  nbHits: boolean;
  typo:   boolean;
 }
 
 export interface Hit {
  _highlightResult: HighlightResult;
  deprecated:       boolean;
  description:      string;
  githubRepo:       GithubRepo;
  homepage:         null | string;
  jsDelivrHits:     number;
  keywords:         string[];
  license:          License;
  moduleTypes:      ModuleType[];
  name:             string;
  objectID:         string;
  owner:            HitOwner;
  popular:          boolean;
  styleTypes:       StyleType[];
  version:          string;
 }
 
 export interface HighlightResult {
  _searchInternal: SearchInternal;
  description:     Description;
  keywords:        Description[];
  name:            Description;
  owner:           HighlightResultOwner;
  owners:          HighlightResultOwner[];
 }
 
 export interface SearchInternal {
  popularAlternativeNames: Description[];
  popularName:             Description;
 }
 
 export interface Description {
  fullyHighlighted?: boolean;
  matchLevel:        MatchLevel;
  matchedWords:      Query[];
  value:             string;
 }
 
 export enum MatchLevel {
  Full = "full",
  None = "none",
 }
 
 export enum Query {
  React = "react",
 }
 
 export interface HighlightResultOwner {
  name: Description;
 }
 
 export interface GithubRepo {
  head:    string;
  path:    string;
  project: string;
  user:    string;
 }
 
 export enum License {
  BSD3Clause = "BSD-3-Clause",
  MIT = "MIT",
 }
 
 export enum ModuleType {
  Cjs = "cjs",
  Esm = "esm",
 }
 
 export interface HitOwner {
  avatar: string;
  link:   string;
  name:   string;
 }
 
 export enum StyleType {
  CSS = "css",
  None = "none",
 }
 
 export interface ProcessingTimingsMS {
  fetch:   Fetch;
  request: Request;
  total:   number;
 }
 
 export interface Fetch {
  scanning: number;
  total:    number;
 }
 
 export interface Request {
  roundTrip: number;
 }
 