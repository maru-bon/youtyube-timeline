const h = window.React.createElement;

export function TimelineCard({ month, title, description, thumbnail }) {
  return h(
    "article",
    { className: "timeline-entry" },
    h(
      "div",
      { className: "timeline-card" },
      h(
        "div",
        { className: "timeline-card__image" },
        h("img", { src: thumbnail, alt: title })
      ),
      h(
        "div",
        { className: "timeline-card__body" },
        h("p", { className: "timeline-card__meta" }, h("time", null, month)),
        h("h3", { className: "timeline-card__title" }, title)
      )
    ),
    h("p", { className: "timeline-entry__summary" }, description)
  );
}
