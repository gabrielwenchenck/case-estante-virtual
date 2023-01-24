import { IResultDB } from "./../../models/Result";
import { IAthleteDB } from "../../models/Athlete";
import { ICompetitionDB } from "../../models/Competition";

export const athletes: IAthleteDB[] = [
  {
    id: "101",
    name: "Phelps",
  },
  {
    id: "102",
    name: "Cielo",
  },
  {
    id: "103",
    name: "Ledecky",
  },
  {
    id: "104",
    name: "Železný",
  },
  {
    id: "105",
    name: "Špotáková",
  },
  {
    id: "106",
    name: "Menéndez",
  },
];

export const competitions: ICompetitionDB[] = [
  {
    id: "101",
    name: "100m final",
    attempts: 1,
    is_closed: false,
  },
  {
    id: "102",
    name: "Dardo final",
    attempts: 3,
    is_closed: false,
  },
];

export const results: IResultDB[] = [
  {
    id: "101",
    value: 49.7,
    value_2: 0,
    value_3: 0,
    unit: "s",
    competition_id: "101",
    athlete_id: "101",
  },
  {
    id: "102",
    value: 47.5,
    value_2: 0,
    value_3: 0,
    unit: "s",
    competition_id: "101",
    athlete_id: "102",
  },
  {
    id: "103",
    value: 48.3,
    value_2: 0,
    value_3: 0,
    unit: "s",
    competition_id: "101",
    athlete_id: "103",
  },
  {
    id: "104",
    value: 90.57,
    value_2: 98.48,
    value_3: 95.35,
    unit: "m",
    competition_id: "102",
    athlete_id: "104",
  },
  {
    id: "105",
    value: 94.97,
    value_2: 92.28,
    value_3: 99.13,
    unit: "m",
    competition_id: "102",
    athlete_id: "105",
  },
  {
    id: "106",
    value: 85.57,
    value_2: 89.26,
    value_3: 94.77,
    unit: "m",
    competition_id: "102",
    athlete_id: "106",
  },
];
