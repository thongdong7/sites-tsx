const list: Page = {
    patterns: ["^https://baomoi.com/?$"],
    example: "https://baomoi.com",

    script: {
        article: [
            pick({
                title: [$value.title],
                summary: [$value.description],
                url: [
                    $value.url,
                    replace({ pattern: ".epi.*$", replacement: ".epi" }),
                    url()
                ],
                created_at: [$value.date, date1000()],
                image: [$value.thumbL],
            }),
        ],
    },

    transforms: [
        pick({
            title: [html_node(), html_select("title@text")],
            items: [
                nextjs_data(),
                $value.props.pageProps.resp.data.content.sections,
                map($value.items),
                flatten(),
                filter($value.url != null),
                map(script("article")),
                filter($value.title != null),
            ],
        }),
    ],
};
