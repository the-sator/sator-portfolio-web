export const sanitizeSearchInput = (input: string): string => {
  // Remove any characters that aren't alphanumeric, spaces, or common punctuation
  return input
    .replace(/[^a-zA-Z0-9 .,?!-]/g, "")
    .trim()
    .split(" ")
    .join("_")
    .slice(0, 100);
};

export const constructSearchQuery = (query: string, searchOption: string) => {
  return query.trim().split(/\s+/).join(` ${searchOption} `);
};

export function getCorrectOrigin(origin: string): string {
  if (origin.includes("localhost")) {
    return origin.replace(/^https?:\/\//, "http://");
  } else if (origin.startsWith("http://") && !origin.includes("localhost")) {
    return origin.replace("http://", "https://");
  }
  return origin;
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

export function removeExtension(fileName: string) {
  return fileName.replace(/\.[^.]+$/, "");
}

export function stringToPriceRange(str: string): number[] {
  const s = str.split("-");
  if (s.length === 1) {
    const start = Number(s[0]);
    return [start];
  }
  const start = Number(s[0]);
  const end = Number(s[1]);
  if (s.length !== 2 || isNaN(start) || isNaN(end)) {
    return [0, 0]; // Return default range for invalid input
  }
  if (start > end) {
    return [0, 0]; // Return default range for invalid input
  }

  return [start, end];
}

export function numArrayToString(num: number[], prefix?: string): string {
  if (num.length === 1) {
    return String(num);
  }

  if (num.length > 2) {
    return "0";
  }
  const str =
    (prefix ?? "") + String(num[0]) + " - " + (prefix ?? "") + String(num[1]);
  return str;
}

export function priceRangeToString(num: number[]): string {
  if (num.length === 1) {
    return num.toLocaleString("en-US", { style: "currency", currency: "USD" });
  }

  if (num.length > 2) {
    return "0";
  }
  const startRange = num[0].toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  const endRange = num[1].toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  const str = startRange + " - " + endRange;
  return str;
}

export function toQueryString(
  params: Record<string, string | string[] | number | boolean | undefined>,
): string {
  const query = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null)
    .flatMap(([key, value]) => {
      if (Array.isArray(value)) {
        // Handle arrays by repeating the key for each value
        return value.map(
          (item) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(String(item))}`,
        );
      }
      // Handle single values
      return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
    })
    .join("&");
  return query ? `?${query}` : "";
}
