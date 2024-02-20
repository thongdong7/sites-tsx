const list: Page = {
  patterns: ["^https://baomoi.com/[a-z-]+.epi$"],
  example: "https://baomoi.com/the-gioi.epi",

  transforms: [
    pick({
      title: [html_node(), html_select("title@text")],
      items: [
        nextjs_data(),
        $value.props.pageProps.resp.data.content.sections[1].items,
        map(
          pick({
            title: [$value.title],
            summary: [$value.description],
            image: [$value.thumb],
            url: [
              $value.url,
              replace({ pattern: ".epi.*$", replacement: ".epi" }),
              url(),
            ],
            created_at: [$value.date, date1000()],
          })
        ),
        filter($value.title != null),
      ],
    }),
  ],
};
