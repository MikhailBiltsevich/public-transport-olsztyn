export const getResponseContent = (
  parsedResponse: Record<string, any>,
  ...keys: string[]
) => {
  let responseContent = parsedResponse.envelope.body;
  keys.forEach((key) => {
    responseContent = responseContent[key];
  });

  return responseContent;
};

export const trimValue = (value: string) => {
  return value.trim();
};

export const splitRoutes = (value: string, name: string) => {
  if (name !== "l" || typeof value !== "string") {
    return value;
  }

  const routes = value.split(";");

  return routes.map((route: string) => {
    const [name, type] = route.split(",");
    return { name, type };
  });
};
