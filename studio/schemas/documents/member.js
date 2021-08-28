export default {
  name: "member",
  type: "document",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
    },
    {
      name: "image",
      type: "mainImage",
      title: "Image",
    },
    {
      name: "bio",
      type: "bioPortableText",
      title: "Biography",
    },
    {
      name: "gender",
      type: "string",
    },
    {
      name: "job",
      type: "string",
    },
    {
      name: "mobile",
      type: "string",
    },
    {
      name: "email",
      type: "email",
    },
    {
      name: "city",
      type: "string",
    },
    { name: "memberships", type: "array", of: [{ type: "membership" }] },
    { name: "activities", type: "array", of: [{ type: "activity" }] },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "city",
      media: "image",
    },
  },
};
