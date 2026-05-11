import { TimelineHeader } from "./TimelineHeader.js";
import { TimelineYearSection } from "./TimelineYearSection.js";
import { timelineData } from "../data/timelineData.js";

const h = window.React.createElement;
const { useEffect, useMemo, useRef, useState } = window.React;

export function TimelineApp() {
  const [currentYear, setCurrentYear] = useState(timelineData[0].year);
  const sectionElementsRef = useRef({});

  const years = useMemo(() => timelineData.map((item) => item.year), []);

  useEffect(() => {
    const sectionElements = years
      .map((year) => sectionElementsRef.current[year])
      .filter(Boolean);

    if (sectionElements.length === 0) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top));

        if (visibleEntries.length > 0) {
          setCurrentYear(visibleEntries[0].target.dataset.year);
        }
      },
      {
        root: null,
        rootMargin: "-18% 0px -62% 0px",
        threshold: [0, 0.2, 0.45]
      }
    );

    sectionElements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, [years]);

  function registerYearSection(year, element) {
    if (element) {
      sectionElementsRef.current[year] = element;
      return;
    }

    delete sectionElementsRef.current[year];
  }

  return h(
    "div",
    { className: "page-shell" },
    h(
      "nav",
      { className: "timeline-nav", "aria-label": "サイトナビゲーション" },
      h(
        "div",
        { className: "timeline-nav__inner" },
        h("a", { className: "timeline-nav__link", href: "/" }, "ランキング"),
        h("a", { className: "timeline-nav__link is-active", href: "/timeline/" }, "タイムライン")
      )
    ),
    h(
      "main",
      { className: "timeline-page" },
      h(
        "div",
        { className: "timeline-current-year", "aria-live": "polite", "aria-atomic": "true" },
        h("span", { className: "timeline-current-year__label" }, "Now Viewing"),
        h("strong", { className: "timeline-current-year__value" }, currentYear)
      ),
      h(TimelineHeader),
      h(
        "section",
        { className: "timeline", "aria-label": "YouTube年別タイムライン" },
        timelineData.map((yearBlock) =>
          h(TimelineYearSection, {
            key: yearBlock.year,
            year: yearBlock.year,
            summary: yearBlock.summary,
            events: yearBlock.events,
            sectionRef: (element) => registerYearSection(yearBlock.year, element)
          })
        )
      )
    )
  );
}
