const { AllRoutes } = require("./router/router");

module.exports = class Application {
  #express = require("express");
  #app = this.#express();
  constructor(PORT, DB_URL) {
    this.configDatabase(DB_URL);
    this.configApplication();
    this.createServer(PORT);
    this.createRoutes();
    this.errorHandler();
  }
  configApplication() {
    const path = require("path");
    this.#app.use(this.#express.static(path.join(__dirname, "..", "public")));
    this.#app.use(this.#express.json());
    this.#app.use(this.#express.urlencoded({ extended: true }));
  }
  createServer(PORT) {
    const http = require("http");
    const server = http.createServer(this.#app);
    server.listen(PORT, () => {
      console.log(`Server Listening on -> http://localhost:${PORT}`);
    });
  }
  configDatabase(DB_URL) {
    const { connect } = require("mongoose");
    connect(DB_URL, (err) => {
      err
        ? (() => {
            throw err;
          })()
        : console.log("Connected to database successfully");
    });
  }
  errorHandler() {
    this.#app.use((req, res, next) => {
      return res
        .status(404)
        .json({ status: 404, success: false, message: "page Not Found!!" });
    });
    this.#app.use((error, req, res, next) => {
      const status = error?.status || 500;
      const message = error?.message || "Internal Server Error";
      return res.status(status).json({ status, success: false, message });
    });
  }
  createRoutes() {
    this.#app.get("/", (req, res, next) => {
      return res.json({
        message: "this is a blog application!!",
      });
    });
    this.#app.use(AllRoutes);
  }
};
