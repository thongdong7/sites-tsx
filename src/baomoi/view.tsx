const view: Page = {
  patterns: ["^https://baomoi.com/.+/c/[\\d]+.epi$"],
  example: "https://baomoi.com/nhung-khu-pho-khong-co-rac/c/45826011.epi",

  transforms: [
    nextjs_data(),
    $value.props.pageProps.resp.data.content,
    pick({
      title: [$value.title],
      summary: [$value.description],
      url: [$value.url, url()],
      created_at: [$value.date, date1000()],
      content: [
        $value.bodys,
        map(
          switch_({
            field: "${value.type}",
            cases: {
              image: '<img src="${value.contentOrigin}" />',
              text: "<p>${value.content}</p>",
            },
            default: "",
          })
        ),
        filter($value != ""),
        join("\n"),
      ],
    }),
  ],
};
