export const GOOGLE_API_KEY = "AIzaSyCu5Vh4v5aQLJBSHVxzWeAOWHdy0_8pJaM";

export const USER_MS = "fragrant-firefly-c3eb.lunacd.workers.dev";
export const PAYMENT_MS =
  "ec2-18-191-190-109.us-east-2.compute.amazonaws.com:5000";
export const AUTH_MS = "ec2-18-219-115-83.us-east-2.compute.amazonaws.com:6000";

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
