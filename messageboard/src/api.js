let apiRoot = "http://localhost:3001/api/init";
let apiLinks = {};
let apiSchemas = {};

export const initializeApi = async () => {
  try {
    const response = await fetch(apiRoot);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    updateApiLinks(data.links);
    updateSchemas(data.schemas);
    return data;
  } catch (error) {
    console.error("Failed to initialize API:", error);
    throw error;
  }
};

const updateApiLinks = (links) => {
  apiLinks = { ...apiLinks, ...links };
};

const updateSchemas = (schemas) => {
  apiSchemas = { ...apiSchemas, ...schemas };
};

const getLink = (rel, params = {}) => {
  let link = apiLinks[rel];
  if (!link) {
    throw new Error(`Link '${rel}' not found`);
  }
  // Replace any parameters in the link
  Object.keys(params).forEach((key) => {
    link = link.replace(`{${key}}`, params[key]);
  });
  return `http://localhost:3001${link}`; // Return the dynamically generated link
};

const apiCall = async (
  method,
  rel,
  isProtected = false,
  body = null,
  params = {}
) => {
  let url = getLink(rel, params);
  const authHeader = {
    "Content-Type": "application/json",
  };
  const protectedHeaders = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  };
  const options = {
    method,
    headers: isProtected ? protectedHeaders : authHeader,
  };
  if (body) options.body = JSON.stringify(body);

  const response = await fetch(url, options);
  const data = await response.json();

  if (data.links) updateApiLinks(data.links);
  if (data.schemas) updateSchemas(data.schemas);

  if (!response.ok)
    throw new Error(
      data.error || `API call failed with status ${response.status}`
    );

  return data;
};

// api calls using hypermediaLinks
export const getChannelsFromServer = () =>
  apiCall("GET", "allChannels", true, null);
export const getMessagesFromServer = (channelId) =>
  apiCall("GET", "channelMessages", true, null, { channelId });
export const getArchivedMessages = (channelId) =>
  apiCall("GET", "archivedMessages", true, null, { channelId });
export const clearChatForChannel = (channelId) =>
  apiCall("DELETE", "clearChannelMessages", true, null, { channelId });
export const sendMessageToServer = (channelId, content) =>
  apiCall("POST", "sendMessage", true, { content }, { channelId });
export const createChannelOnServer = (channelData) =>
  apiCall("POST", "createChannel", true, channelData);
export const deleteChannelOnServer = (channelId) =>
  apiCall("DELETE", "deleteChannel", true, null, { channelId });
export const registerUser = (userData) =>
  apiCall("POST", "registerUser", false, userData);
export const loginUser = (credentials) =>
  apiCall("POST", "loginUser", false, credentials);

// getSchema function to get schema for validtion on react componenat
export const getSchema = (schemaName) => apiSchemas[schemaName];

// external api fetchRandomJoke
export const fetchRandomJoke = async () => {
  try {
    const response = await fetch("https://v2.jokeapi.dev/joke/Any");
    if (!response.ok) {
      throw new Error("Failed to fetch joke");
    }
    const jokeData = await response.json();
    return jokeData;
  } catch (error) {
    console.error("Error fetching joke:", error);
    return null;
  }
};
