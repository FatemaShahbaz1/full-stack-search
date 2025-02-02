import axios from "axios";
import { getCodeSandboxHost } from "@codesandbox/utils";

const codeSandboxHost = getCodeSandboxHost(3001);
const API_BASE_URL = codeSandboxHost
  ? `https://${codeSandboxHost}`
  : "http://localhost:3001";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
