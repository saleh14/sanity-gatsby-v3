export default {
  name: "activity",
  type: "object",
  fields: [
    {
      name: "title",
      type: "string",
    },
    { name: "regStartDate", type: "datetime" },
    { name: "regEndDate", type: "datetime" },
    { name: "activityTime", type: "datetime" },
    { name: "activityTimeEnd", type: "datetime" },
    { name: "course", type: "boolean" },
  ],
  preview: {
    select: {
      title: "title",
    },
  },
};
