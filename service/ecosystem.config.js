module.exports = {
  apps: [
    {
      name: "api_service",
      script: "npm run dev",
      cron_restart: "0 0 * * *",
    },
  ],
};
