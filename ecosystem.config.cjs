module.exports = {
  apps: [
    {
      name: "legion",
      script: "npm",
      args: "start --prefix ./back start:prod",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
