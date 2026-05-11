const h = window.React.createElement;

export function TimelineHeader() {
  return h(
    "header",
    { className: "timeline-hero" },
    h("p", { className: "timeline-hero__eyebrow" }, "YouTube Timeline"),
    h("h1", { className: "timeline-hero__title" }, "年ごとの出来事を、流れで見る"),
    h(
      "p",
      { className: "timeline-hero__lead" },
      "ランキングとは別に、その年にどんな動画や空気感が強かったのかを、縦スクロールでたどれるタイムラインです。"
    )
  );
}
