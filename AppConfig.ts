const { hostname } = window.location;
const localhost: boolean = hostname.includes("localhost");
const staging: boolean = localhost || hostname.includes("staging");

interface Environment {
  APP_ENVIRONMENT: string;
  BASE_URL: string;
}

const stagingEnv: Environment = {
  APP_ENVIRONMENT: "staging",
  BASE_URL: "https://staging-api.chats.cash/v1/",
};

const productionEnv: Environment = {
  APP_ENVIRONMENT: "production",
  BASE_URL: "https://api.chats.cash/v1/",
};

const environment: Environment = staging ? stagingEnv : productionEnv;

export default environment;
