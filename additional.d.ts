type Resort = {
  id: number;
  name: string;
  continent: string;
  country: string;
  stateOrProvince: string;
  searchString: string;
  url: string;
  difficulty: number;
  altitude: number;
  score: number;
};

type RenderedResort = Resort & {
  relativeHeight: number;
  relativeScore: number;
  relativeSteepness: number;
  rightFaceColor: number[];
  leftFaceColor: number[];
};
