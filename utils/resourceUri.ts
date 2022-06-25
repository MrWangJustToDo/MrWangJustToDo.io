const isProd = process.env.NODE_ENV === "production";

export const resourceUri = (uri: string) => {
  return isProd ? "/MrWangJustToDo.io/" + uri : uri;
};
