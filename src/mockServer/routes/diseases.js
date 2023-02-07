import { diseaseDTO } from "../fixtures/diseaseDTO";

export const diseasesRoutes = (server) => {
  server.namespace("/diseases", () => {
    server.get("/all").intercept((req, res) => {
      res.status(200).json([diseaseDTO, diseaseDTO, diseaseDTO, diseaseDTO]);
    });
    server.get("/opd").intercept((req, res) => {
      res.status(200).json([diseaseDTO, diseaseDTO, diseaseDTO, diseaseDTO]);
    });
    server.get("/ipd/in").intercept((req, res) => {
      res.status(200).json([diseaseDTO, diseaseDTO, diseaseDTO, diseaseDTO]);
    });
    server.get("/ipd/out").intercept((req, res) => {
      res.status(200).json([diseaseDTO, diseaseDTO, diseaseDTO, diseaseDTO]);
    });
  });
};
