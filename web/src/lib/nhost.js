import { createClient } from "nhost-js-sdk";

const config = {
  baseURL: "https://backend-ae96eb59.nhost.app",
};

const { auth, storage } = createClient(config);


export { auth, storage };
