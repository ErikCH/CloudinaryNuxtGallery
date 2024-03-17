import cloudinary from "cloudinary";
export default defineEventHandler(async (event) => {
  const environmental = useRuntimeConfig(event);

  interface Results {
    resources: [
      {
        public_id: string;
        context: {
          alt: string;
        };
      }
    ];
  }

  cloudinary.v2.config({
    cloud_name: environmental.public.cloudinary.cloudName,
    api_key: environmental.cloudKey,
    api_secret: environmental.cloudSecret,
  });

  const data: Results = await cloudinary.v2.search
    .expression("resource_type:image")
    .with_field("context")
    .sort_by("public_id", "desc")
    .max_results(12)
    .execute();
  return {
    ...data,
  };
});
