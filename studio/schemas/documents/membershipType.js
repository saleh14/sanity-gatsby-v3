export default {
  name: "membershipType",
  type: "document",
  fields: [
    { name: "type", type: "string" },
    { name: "description", type: "string" },
    { name: "anualFee", type: "number" },
  ],
  preview: {
    select: {
      title: "type",
    },
  },
};
