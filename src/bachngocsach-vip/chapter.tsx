const view: Page = {
  patterns: [
    "https://bachngocsach\\.vip/dich/[a-z0-9-]+/\\d+/[a-z0-9-]+/\\d+\\.html$",
  ],
  example:
    "https://bachngocsach.vip/dich/pham-nhan-tien-gioi-thien-pntt-2/742/luyen-khi-hau-ky/339058.html",
  // example : "https://bachngocsach.vip/dich/gia-toc-tu-tien-ta-lam-tran-toc-linh-thu/742/chuong-1-cuoc-song-hang-ngay-cua-mot-con-ran-1/338514.html"
  // search : {
  //   url   : "https://bachngocsach.com.vn/reader/search"
  //   field : "ten"
  // }

  transforms: [
    $context.source,
    replace({ pattern: "^.+/(\\d+).html$", replacement: "$1" }),
    set_var("chapter_id", $value),
    "https://ngocsach.com/api/v1/chapter/" + $var.chapter_id,
    download({ type: "json" }),
    set_var("chapter", $value),
    "https://ngocsach.com/api/nav-chapter/" +
      $var.chapter_id +
      "?page=next",
    download({ type: "json", value_on_error: {} }),
    set_var("next_chapter", $value),
    "https://ngocsach.com/api/nav-chapter/" +
      $var.chapter_id +
      "?page=pre",
    download({ type: "json" }),
    set_var("pre_chapter", $value),
    $var.chapter,
    stop(),
    pick({
      title: $value.name,
      content: [
        // TODO: No more web_content field, now the data is encrypted (field encrypted.wdata)
        $value.web_content,
        replaceDict({
          k: "h",
          j: "n",
          v: "t",
          h: "m",
          x: "c",
          n: "g",
          s: "r",
          "`": "k",
          m: "p",
          d: "l",
          "}": "v",
          t: "s",
          "|": "b",
          c: "d",
          g: "x",
        }),
        replace({ pattern: "\n", replacement: "<br/>" }),
      ],
      footer_links: [
        template([
          {
            text: $var.pre_chapter.name,
            url:
              $var.pre_chapter.id &&
              "https://bachngocsach.vip/dich/pham-nhan-tien-gioi-thien-pntt-2/" +
                $var.pre_chapter.story_id +
                "/" +
                $var.pre_chapter.slug +
                "/" +
                $var.pre_chapter.id +
                ".html",
          },
          {
            text: $var.next_chapter.name,
            url:
              $var.next_chapter.id &&
              "https://bachngocsach.vip/dich/pham-nhan-tien-gioi-thien-pntt-2/" +
                $var.next_chapter.story_id +
                "/" +
                $var.next_chapter.slug +
                "/" +
                $var.next_chapter.id +
                ".html",
          },
        ]),
        filter($value.url != null),
      ],
    }),
  ],
};
