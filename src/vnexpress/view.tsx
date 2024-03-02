const view: Page = {
  patterns: ["^https://vnexpress.net/.+-[\\d]+.html$"],
  example:
    "https://vnexpress.net/chieu-lua-chuyen-tien-trung-ten-tai-khoan-4716884.html",

  transforms: [
    html_node(),
    html_fix_preload_image(),
    pick({
      title: [html_select("h1.title-detail@text")],
      summary: [html_select(".description@html")],
      content: [html_select(".fck_detail,.audioContainter@html"), html_for_view()],
    }),
  ],
};
