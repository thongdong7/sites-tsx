const view: Page = {
  patterns: ["^https://tinhte.vn/thread/.+\\.\\d+/?$"],
  example:
    "https://tinhte.vn/thread/tren-tay-rambler-14-oz-mau-nordic-blue-ly-giu-nhiet-ban-chay-nhi-cua-yeti.3669956/",

  script: {
    convert_thread: [
      pick({
        title: [$value.thread_title],
        url: [$value.links.permalink],
        image: [$value.thread_image.link],
        content: [$value.posts[0].post_body_html, html_safe()],
        created_at: [$value.thread_create_date, date1000()],
        author: [
          pick({
            name: [$value.creator_username],
            avatar: [$value.links.first_poster_avatar],
          }),
        ],
        comments: [
          $value.posts,
          slice({ start: "1" }),
          map(script("post_to_comment")),
        ],
      }),
    ],
    post_to_comment: [
      pick({
        content: [$value.post_body_html],
        author: [
          pick({
            name: [$value.poster_username],
            avatar: [$value.links.poster_avatar],
          }),
        ],
      }),
    ],
  },

  transforms: [
    nextjs_data(),
    $value.props.pageProps.apiData.jobs,
    values(),
    filter($value._req.uri == "posts"),
    $value[0].thread,
    script("convert_thread"),
  ],
};
