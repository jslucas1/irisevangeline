import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

export default function (eleventyConfig) {
  // Every <img> in the site (including Markdown images) is resized into
  // web-friendly sizes. Re-encoding also strips photo metadata such as GPS location.
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["webp", "jpeg"],
    widths: [480, 960, 1600],
    defaultAttributes: {
      loading: "lazy",
      decoding: "async",
      sizes: "(min-width: 760px) 720px, 100vw",
    },
  });

  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/CNAME");
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  // All stories, newest first
  eleventyConfig.addCollection("stories", (api) =>
    api.getFilteredByGlob("src/stories/*/index.md").sort((a, b) => b.date - a.date)
  );

  eleventyConfig.addFilter("readableDate", (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric", month: "long", day: "numeric", timeZone: "UTC",
    })
  );

  eleventyConfig.addFilter("isoDate", (date) => new Date(date).toISOString().slice(0, 10));

  // "12 weeks along" before she's born, "3 months old" after.
  eleventyConfig.addFilter("irisAge", (date, site) => {
    const d = new Date(date);
    const DAY = 86400000;
    if (site.birthDate && d >= new Date(site.birthDate)) {
      const born = new Date(site.birthDate);
      const days = Math.floor((d - born) / DAY);
      if (days === 0) return "Birthday!";
      if (days < 14) return `${days} day${days === 1 ? "" : "s"} old`;
      const months = (d.getUTCFullYear() - born.getUTCFullYear()) * 12 + (d.getUTCMonth() - born.getUTCMonth()) - (d.getUTCDate() < born.getUTCDate() ? 1 : 0);
      if (months < 2) return `${Math.floor(days / 7)} weeks old`;
      if (months < 24) return `${months} months old`;
      const years = Math.floor(months / 12);
      return `${years} years old`;
    }
    if (site.dueDate) {
      // Pregnancy is counted as 40 weeks ending at the due date
      const weeks = 40 - Math.ceil((new Date(site.dueDate) - d) / DAY / 7);
      if (weeks > 0 && weeks <= 42) return `${weeks} weeks along`;
    }
    return "";
  });

  return {
    dir: { input: "src", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
