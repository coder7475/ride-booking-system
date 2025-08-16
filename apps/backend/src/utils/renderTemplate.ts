// Simple template function to replace <%= key %> with value from data
export const renderTemplate = (
  template: string,
  data: Record<string, any> = {},
) => {
  return template.replace(/<%=\s*([\w.]+)\s*%>/g, (_, key: string) => {
    // Support dot notation if needed in future
    const value = key
      .split(".")
      .reduce((acc: any, k: string) => acc?.[k], data);

    // Fallback for name: if undefined, use 'User'
    if (key === "name") return value || "User";

    return value !== undefined ? value : "";
  });
};
