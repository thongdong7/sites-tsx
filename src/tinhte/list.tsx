const list: Page = {
  patterns: ["^https://tinhte.vn/?$"],
  example: "https://tinhte.vn",

  script: {
    parse_promoted: [
      filter($value._req.uri == "threads/promoted"),
      map($value.threads),
      flatten(),
      map(script("convert_thread")),
    ],
    convert_thread: [
      pick({
        title: [$value.thread_title],
        url: [$value.links.permalink],
        image: [$value.thread_image.link],
        created_at: [$value.thread_create_date, date1000()],
        summary: [$value.first_post.post_body_plain_text, split("\n"), first(), truncate_word(200)],
        author: [
          pick({
            name: [$value.creator_username],
            avatar: [$value.links.first_poster_avatar],
          }),
        ],
      }),
    ],
  },

  transforms: [
    pick({
      title: [html_node(), html_select("title@text")],
      items: [
        nextjs_data(),
        $value.props.pageProps.apiData.jobs,
        values(),
        script("parse_promoted"),
        uniq_by_field("url"),
      ],
    }),
  ],
};
