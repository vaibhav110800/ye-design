import { withTests } from "@storybook/addon-jest";
import { addDecorator } from "@storybook/react";
import { globalTypes, parameters } from "wo-library/tools/storybook/index.js";
import "../src/styles/base.css";
import defaultThemeStyleOptions from "../src/styles/themes";
import { withThemeProvider } from "../src/tools/storybook";
import "./preview.css";

globalTypes.theme.toolbar.items.push(...Object.keys(defaultThemeStyleOptions));
export { parameters, globalTypes };

export const decorators = [withThemeProvider];

let results;

try {
  results = "../reports/test-report.json";
} catch {
  console.log("reports/test-report.json does not exist, skipping.");
}

if (results) addDecorator(withTests({ results }));
