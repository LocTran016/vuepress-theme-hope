import { capitalize, strictCapitalize } from "../src";

it("capitalize", () => {
  expect(capitalize("mrhope")).toEqual("Mrhope");
  expect(capitalize("MRHOPE")).toEqual("MRHOPE");
  expect(capitalize("MrHope")).toEqual("MrHope");
  expect(capitalize("mrHope")).toEqual("MrHope");
});

it("strictCapitalize", () => {
  expect(strictCapitalize("mrhope")).toEqual("Mrhope");
  expect(strictCapitalize("MRHOPE")).toEqual("Mrhope");
  expect(strictCapitalize("MrHope")).toEqual("Mrhope");
  expect(strictCapitalize("mrHope")).toEqual("Mrhope");
});