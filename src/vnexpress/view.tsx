const view: Page = {
  patterns: ["^https://vnexpress.net/.+-[\\d]+.html$"],
  example:
    "https://vnexpress.net/nha-o-xa-hoi-chiec-phao-cua-doanh-nghiep-bat-dong-san-4589120.html",

  transforms: [
    html_node(),
    html_fix_preload_image(),
    pick({
      title: [html_select("h1.title-detail@text")],
      summary: [html_select(".description@html")],
      content: [html_select(".fck_detail@html"), html_safe()],
    }),
  ],
};
