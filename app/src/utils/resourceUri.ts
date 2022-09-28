const isProd = process.env.NODE_ENV === "production";

export const resourceUri = (uri: string) => (isProd ? "/MrWangJustToDo.io/" + uri : uri);
