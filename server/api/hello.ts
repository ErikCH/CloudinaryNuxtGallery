import cloudinary from "cloudinary";
export default defineEventHandler(async (event) => {
  interface Results {
    resources: [
      {
        public_id: string;
      }
    ];
  }

  const data: Results = await cloudinary.v2.search
    .expression("resource_type:image")
    .sort_by("public_id", "desc")
    .max_results(10)
    .execute();
  //   console.log("data", data);
  return {
    ...data
  };
});
