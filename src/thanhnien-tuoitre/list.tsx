const list: Page = {
  patterns: [
    "^https://thanhnien.vn$",
    "^https://thanhnien.vn/[a-z-]+.htm$",
    "^https://tuoitre.vn/?$",
    "^https://tuoitre.vn/[a-z-]+.htm$",
  ],

  // example: "https://thanhnien.vn"
  example: "https://tuoitre.vn/the-gioi.htm",

  transforms: [
    html_node(),
    pick({
      title: [html_select("title@text")],
      items: [
        html_select_all(
          ".item-first,.item-related .box-category-item,.box-category-sub .box-category-item,.box-category-middle .box-category-item"
        ),
        map(
          pick({
            title: [html_select("a@title")],
            url: [html_select("a@href"), url()],
            summary: [html_select(".box-category-sapo@text")],
            image: [html_select(".box-category-avatar@src")],
          })
        ),
        uniq_by_field("url"),
      ],
    }),
  ],
};
