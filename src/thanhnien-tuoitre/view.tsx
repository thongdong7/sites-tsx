const view: Page = {
  patterns: [
    "^https://thanhnien.vn/.+-[\\d]+.htm",
    "^https://tuoitre.vn/.+-[\\d]+.htm$",
  ],
  example:
    "https://tuoitre.vn/dai-hoc-quoc-gia-tp-hcm-can-tuyen-65-nha-khoa-hoc-tre-xuat-sac-20240228091914819.htm",

  transforms: [
    html_node(),
    pick({
      title: [html_select("[data-role=title]@text")],
      summary: [html_select(".detail-sapo@text")],
      content: [html_select("div.detail-cmain@html"), html_url(), html_safe()],
    }),
  ],
};
