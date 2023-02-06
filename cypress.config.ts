import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      config.env.HOST = "http://localhost:3001/"
      return config
    },
  },
});
