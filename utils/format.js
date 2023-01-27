import slugify from "slugify";

export const getSlug = (content) => encodeURIComponent(slugify(content, { replacement: "-", remove: /[*+~.()?'"!:@/]/g, lower: true, strict: false, locale: "vi" }));
