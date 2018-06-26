import { MAIN_SHEET_ID } from "../constants";

/**
 * adds class to container
 * @param {Object} container
 * @param {Object} cssObj
 *
 */
const addClassToContainer = container => cssObj => {
  // ensure that if the scope already exists, that there is no existing class within that scope to collide with
  if (container.classes[cssObj.scope].includes(cssObj.class)) {
    throw Error(
      `ERROR: class "${cssObj.name}" already exists in scope "${cssObj.scope}"`
    );
  }
  container.classes[cssObj.scope] = [
    ...container.classes[cssObj.scope],
    cssObj.className
  ];
  const mainSheet = container.sheets.find(sheet => sheet.id === MAIN_SHEET_ID);
  if (Array.isArray(cssObj.rules)) {
    mainSheet.sheet.insertRule(
      `.${cssObj.class} { ${cssObj.rules.join(";")} }`.replace(/\s*/g, ""),
      0
    );
  } else if (typeof cssObj.rules === "string") {
    console.log(`.${cssObj.class}{${cssObj.rules}}`.replace(/\s*/g, ""));
    mainSheet.sheet.insertRule(
      `.${cssObj.class}{${cssObj.rules}}`.replace(/\s*/g, ""),
      0
    );
  } else if (typeof cssObj.rules === "object") {
    mainSheet.sheet.insertRule(
      `.${cssObj.class} { 
          ${Object.keys(cssObj.rules)
            .map(key => `${key}: ${cssObj.rules[key]}`)
            .join(";")
            .replace(/\s*/g, "")}
        }`
    );
  }
  return cssObj;
};

export default addClassToContainer;
