import dotenv from "dotenv";
import { Pigeon, JWTSettings } from "pigeon-core";
dotenv.config();

/**
 * This file sets up and starts your API, you can modify settings related to
 * authentication, databases and other general stuff, please check the docs
 * https://github.com/luisbazdev/pigeon-framework for more understanding :)
 */

// Use settings specified by the programmer, make sure to check .env file!
Pigeon.auth("jwt", <JWTSettings>{
  privateKey: <string>process.env["pigeon.auth.jwt.privatekey"],
  routes: {
    enabled: <string>process.env["pigeon.auth.jwt.routes.enabled"],
    login: <string>process.env["pigeon.auth.jwt.routes.login"],
    signup: <string>process.env["pigeon.auth.jwt.routes.signup"],
    logout: <string>process.env["pigeon.auth.jwt.routes.logout"],
  },
});

Pigeon.port(process.env["pigeon.port"] || "2020");

Pigeon.start();
