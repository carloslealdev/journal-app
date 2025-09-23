// En caso de necesitar la implementación del FetchAPI
import "whatwg-fetch"; // <-- yarn add whatwg-fetch
import fetchMock from "jest-fetch-mock";
import { getEnvironments } from "./src/helpers/getEnvironments";

// Enable fetch mocks
fetchMock.enableMocks();

require("dotenv").config({
  path: ".env",
});

jest.mock("./src/helpers/getEnvironments", () => ({
  getEnvironments: () => ({ ...process.env }),
}));
