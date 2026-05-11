import { TimelineCard } from "./TimelineCard.js";

const h = window.React.createElement;

export function TimelineYearSection({ year, summary, events, sectionRef }) {
  return h(
    "section",
    {
      className: "timeline-year",
      "aria-labelledby": `timeline-year-${year}`,
      "data-year": year,
      ref: sectionRef
    },
    h(
      "div",
      { className: "timeline-year__header" },
      h("span", { className: "timeline-node", "aria-hidden": "true" }),
      h("h2", { className: "timeline-year__label", id: `timeline-year-${year}` }, year),
      h("p", { className: "timeline-year__summary" }, summary)
    ),
    h(
      "ul",
      { className: "timeline-year__events", role: "list" },
      events.map((event, index) =>
        h(
          "li",
          { className: "timeline-event", key: `${year}-${index}` },
          h("span", { className: "timeline-event__node", "aria-hidden": "true" }),
          h(TimelineCard, {
            month: event.month,
            title: event.title,
            description: event.description,
            thumbnail: event.thumbnail
          })
        )
      )
    )
  );
}
