export default {
  name: "membership",
  type: "object",
  fields: [
    {
      name: "type",
      type: "reference",
      to: [{ type: "membershipType" }],
    },
    { name: "expireAt", type: "datetime" },
    { name: "status", type: "string" },
    { name: "confirmedAt", type: "datetime" },
  ],
  preview: {
    select: {
      title: "type.0.type",
    },
  },
};
