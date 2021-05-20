export default {
  widgets: [
    { name: "structure-menu" },
    {
      name: "project-info",
      options: {
        __experimental_before: [
          {
            name: "netlify",
            options: {
              description:
                "NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.",
              sites: [
                {
                  buildHookId:
                    "60a6f16beeb59700d0e6bd47",
                  title: "Sanity Studio",
                  name: "sanity-gatsby-v-3-studio",
                  apiId: "709327c5-220d-457c-92a0-45ef5406acc3",
                },
                {
                  buildHookId: "60a6f16bbe5b6d00dee24983",
                  title: "Blog Website",
                  name: "sanity-gatsby-v-3",
                  apiId: "cc88f314-4db7-4aa8-b582-c65f4006a840",
                },
              ],
            },
          },
        ],
        data: [
          {
            title: "GitHub repo",
            value:
              "https://github.com/saleh14/sanity-gatsby-v3",
            category: "Code",
          },
          {
            title: "Frontend",
            value: "https://sanity-gatsby-v-3.netlify.app",
            category: "apps",
          },
        ],
      },
    },
    { name: "project-users", layout: { height: "auto" } },
    {
      name: "document-list",
      options: {
        title: "Recent blog posts",
        order: "_createdAt desc",
        types: ["post"],
      },
      layout: { width: "medium" },
    },
  ],
};
