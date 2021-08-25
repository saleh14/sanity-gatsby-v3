import { createClient } from "nhost-js-sdk";

const config = {
  baseURL: "https://backend-e7c479eb.nhost.app",
};

const { auth, storage } = createClient(config);


export { auth, storage };
