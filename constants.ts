export const GOOGLE_API_KEY = "AIzaSyCu5Vh4v5aQLJBSHVxzWeAOWHdy0_8pJaM";

export const MAIN = "https://api.podplug.com/main";
export const USER_ONLY = "https://api.podplug.com/main/user_only";
export const ALL = "https://api.podplug.com/main/all";

export const VENUES_LISTALL = JSON.stringify({
  ms: "users",
  path: "/venues/listall",
  method: "GET",
  details: {},
});

export const JOBS_LISTALL = JSON.stringify({
  ms: "users",
  path: "/jobs/listall",
  method: "GET",
  details: {},
});

export const JSON_HEADER = {
  "Content-Type": "application/json",
};
