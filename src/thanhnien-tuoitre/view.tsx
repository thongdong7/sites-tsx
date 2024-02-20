const view: Page = {
  patterns: [
    "^https://thanhnien.vn/.+-[\\d]+.htm",
    "^https://tuoitre.vn/.+-[\\d]+.htm$",
  ],
  example:
    "https://thanhnien.vn/sinh-vien-viet-nam-tai-han-quoc-chu-trong-nghien-cuu-khoa-hoc-185230415152639264.htm",

  transforms: [
    html_node(),
    pick({
      title: [html_select("[data-role=title]@text")],
      summary: [html_select(".detail-sapo@text")],
      content: [html_select("div.detail-cmain@html")],
    }),
  ],
};
