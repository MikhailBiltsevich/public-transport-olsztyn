export type PlanedDepartures = {
  time: string;
  stop: {
    name: string;
    num: string;
    id: string;
    mode: string;
    day: {
      desc: string;
      type: string;
      actual: string;
      r: {
        nr: string;
        nrk: string;
        dir: string;
        vehType: string;
        vehSymbol: string;
        vehNote: string;
        desc: string;
        s: {
          th: string;
          tm: string;
          uw: string;
          id_kursu: string;
          uid: string;
        }[];
      }[];
    }[];
  };
};
