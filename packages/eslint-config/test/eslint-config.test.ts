import { buildConfig, template, callback } from "../bin/eslint-config";
import fs from "fs";

jest.mock("fs");

test("buildConfig()", () => {
  buildConfig({ example: "Example" });
  expect(fs.writeFile).toHaveBeenCalledWith(
    ".eslintrc.js",
    template,
    "utf8",
    callback
  );
});
