const list: Page = {
  patterns: ["https://bachngocsach.vip/?$"],
  example: "https://bachngocsach.vip",
  search: {
    url: "https://bachngocsach.com.vn/reader/search",
    field: "ten",
  },

  script: {
    article: [
      pick({
        title: $value.name,
        image: $value.cover,
        url: [
          "https://bachngocsach.vip/truyen/" +
            $value.slug +
            "/" +
            $value.id +
            ".html",
        ],
        summary: [$value.desc, truncate_word(100)],
        author: pick({
          name: $value.author.name,
          url: [
            "https://bachngocsach.vip/tac-gia/" +
              $value.author.slug +
              "/" +
              $value.author.id +
              ".html",
          ],
        }),
      }),
    ],
    category_new: [
      download({
        url: "https://ngocsach.com/api/story-newest?per_page=10",
        type: "json",
      }),
      $value.data,
      map(script("article")),
    ],
    editors: [
      download({
        url: "https://ngocsach.com/api/recommended-stories?per_page=12&option=landing",
        type: "json",
      }),
      map(script("article")),
    ],
  },

  transforms: [
    html_node(),
    pick({
      title: "Bạch Ngọc Sách VIP",
      categories: [
        pick_list([
          [
            pick({
              title: ["Truyện mới nhất"],
              items: [script("category_new")],
              display: ["card"],
            }),
          ],
          [
            pick({
              title: ["Top Ngọc Phiếu (tuần)"],
              items: [script("editors")],
              display: ["card"],
            }),
          ],
        ]),
      ],
    }),
  ],
};
