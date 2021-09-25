import Resort from "./Resort";

export function getAllResorts(): Resort[] {
  // console.log(resortsData.map());

  return [
    {
      id: 0,
      name: "",
      continent: "",
      country: "",
      altitude: 0,
      stateOrProvince: "",
      difficulty: 0,
      url: "",
      score: 0,
    },
  ];
}
