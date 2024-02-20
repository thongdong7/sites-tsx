const list: Page = {
  patterns: ["^https://vnexpress.net/?$", "^https://vnexpress.net/[a-z-]+$"],
  example: "https://vnexpress.net/",
  transforms: [
    html_node(),
    pick({
      title: [html_select("title@text")],
      items: [
        html_select_all(".item-news"),
        map(
          pick({
            title: [html_select("h3.title-news a@title")],
            url: [html_select("h3.title-news a@href"), url()],
            summary: [html_select(".description a@text")],
            image: [
              html_select("[itemprop=contentUrl]@data-src") ||
                html_select("[itemprop=contentUrl]@src"),
            ],
          })
        ),
        filter($value.title != null),
      ],
    }),
  ],
};
