import { Coaster } from "../types/data";

export const steelVengeance: Coaster = {
  id: "1",
  name: "Steel Vengeance",
  park: "Cedar Point",
  country: "United States",
  manufacturer: "Rocky Mountain Construction",
  model: "I-Box",
  material: "Hybrid",
};

export const fury325: Coaster = {
  id: "2",
  name: "Fury 325",
  park: "Carowinds",
  country: "United States",
  manufacturer: "Bolliger & Mabillard",
  model: "Giga",
  material: "Steel",
};

export const lightningRod: Coaster = {
  id: "3",
  name: "Lightning Rod",
  park: "Dollywood",
  country: "United States",
  manufacturer: "Rocky Mountain Construction",
  model: "Launch",
  material: "Wood",
};

export const maverick: Coaster = {
  id: "4",
  name: "Maverick",
  park: "Cedar Point",
  country: "United States",
  manufacturer: "Intamin",
  model: "Blitz",
  material: "Steel",
};

export const hyperion: Coaster = {
  id: "5",
  name: "Hyperion",
  park: "Energylandia",
  country: "Poland",
  manufacturer: "Intamin",
  model: "Mega",
  material: "Steel",
};

export const theVoyage: Coaster = {
  id: "6",
  name: "The Voyage",
  park: "Holiday World",
  country: "United States",
  manufacturer: "The Gravity Group",
  model: "Wooden",
  material: "Wood",
};

export const basicCoasters: Coaster[] = [
  steelVengeance,
  fury325,
  lightningRod,
  maverick,
];

export const rankedCoasters: Coaster[] = [
  { ...steelVengeance, rankPosition: 1 },
  { ...fury325, rankPosition: 2 },
  { ...lightningRod, rankPosition: 3 },
  { ...maverick, rankPosition: 4 },
];

export const comparisonCoasters = {
  steelVengeance,
  fury325,
  hyperion,
  theVoyage,
};

export const duplicateCoasters = {
  original: steelVengeance,
  duplicate: {
    ...steelVengeance,
    id: "7",
    manufacturer: "RMC",
    model: "Hybrid",
  },
};
