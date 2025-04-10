import { addProperty, getAllProperties } from "../controllers/propertyControllers.js";
import upload from "../middlewares/imageUpload.js";

const propertyRoutes = async (fastify) => {
  fastify.post(
    "/property",
    {
      preHandler: upload,
      schema: {
        consumes: ["multipart/form-data"],
      }
    },
    addProperty
  );
  fastify.get("/properties",getAllProperties)
};

export default propertyRoutes;