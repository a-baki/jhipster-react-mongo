import { ExpectedConditions, ElementArrayFinder, ElementFinder, browser, by, element } from 'protractor';

const waitUntilDisplayedTimeout = 30000;

export const checkSelectorExist = (selector: ElementFinder) => selector !== undefined;

/**
 * @returns Function which resolves to boolean
 */
export const isDisplayed = (selector: ElementFinder) => {
  if (!checkSelectorExist(selector)) return;
  return ExpectedConditions.visibilityOf(selector);
};

export const isHidden = (selector: ElementFinder) => {
  if (!checkSelectorExist(selector)) return;
  return ExpectedConditions.invisibilityOf(selector);
};

/**
 * Wait until this page is displayed.
 */
export const waitUntilDisplayed = async (selector: ElementFinder, classname = '', timeout = waitUntilDisplayedTimeout) => {
  if (!checkSelectorExist(selector)) return;

  await browser.wait(
    isDisplayed(selector),
    timeout,
    `Failed while waiting for "${selector.locator()}" of Page Object Class '${classname}' to display.`
  );
};

/**
 * Wait until element is clickable
 */
export const waitUntilClickable = async (selector: ElementFinder, classname = '', timeout = waitUntilDisplayedTimeout) => {
  if (!checkSelectorExist(selector)) return;

  await browser.wait(
    ExpectedConditions.elementToBeClickable(selector),
    timeout,
    `Failed while waiting for "${selector.locator()}" of Page Object Class '${classname}' to be clickable.`
  );
};

export const waitUntilHidden = async (selector: ElementFinder, classname = '', timeout = waitUntilDisplayedTimeout) => {
  if (!checkSelectorExist(selector)) return;

  await browser.wait(
    isHidden(selector),
    timeout,
    `Failed while waiting for "${selector.locator()}" of Page Object Class '${classname}' to be hidden.`
  );
};

export const waitForCount = (elementArrayFinder: ElementArrayFinder, expectedCount: number) => () => {
  return elementArrayFinder.count().then(actualCount => expectedCount === actualCount);
};

export const waitUntilCount = async (
  elementArrayFinder: ElementArrayFinder,
  expectedCount: number,
  timeout = waitUntilDisplayedTimeout
) => {
  await browser.wait(
    waitForCount(elementArrayFinder, expectedCount),
    timeout,
    `Failed while waiting for "${elementArrayFinder.locator()}" to have ${expectedCount} elements.`
  );
};
