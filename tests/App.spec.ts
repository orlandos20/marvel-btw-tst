import { test, expect } from '@playwright/test';

const url = 'http://localhost:5173';

test('Zara challenge E2E', async ({ page }) => {
  page.goto(url);

  const allCards = await page.locator('.card');
  const card = await page
    .locator('.card .card--footer__description--name')
    .first();
  const headerFavCounter = await page.getByTestId('fav-counter');
  const loadingSkeleton = page.locator('.img-loading');
  const headerMarvelLogo = await page.locator('.header').getByRole('link');
  const favBtnOnCard = await page.locator('.fav-btn');
  //Details Page locators
  const heroBannerLoading = await page.locator('.hero-section--img-loading');
  const heroBannerLoaded = await page.locator(
    '.hero-section--container__image'
  );

  //Cards loading
  expect(loadingSkeleton).toBeDefined();

  expect(
    await card.evaluate((node) => node?.firstElementChild?.textContent)
  ).toBe('');

  //Request made.
  const response = await page.waitForResponse((response) =>
    response.url().includes('/public/characters')
  );

  // Assert the response status and body
  const responseBody = await response.json();
  expect(responseBody.code).toBe(200);

  const results = responseBody.data.results;

  if (results.length > 0) {
    expect(
      await card.evaluate((node) => node?.firstElementChild?.textContent)
    ).toBe(results?.[0]?.name);

    expect(await allCards.evaluateAll((cards) => cards.length)).toBe(50);

    //Add to favorites in home page
    expect(await headerFavCounter.textContent()).toEqual('');

    //Click on fav icon in card
    await favBtnOnCard.first().click();
    expect(await headerFavCounter.textContent()).toEqual('1');

    //Remove from favorites in home page
    await favBtnOnCard.first().click();
    expect(await headerFavCounter.textContent()).toEqual('');

    // filter favorites without any favorite saved
    const headerFavContainer = await page.locator('.icon-container');
    await headerFavContainer.click();

    expect(await allCards.evaluateAll((cards) => cards.length)).toBe(0);

    // filter favorites with two favorites
    await headerMarvelLogo.click();
    expect(await allCards.evaluateAll((cards) => cards.length)).toBe(50);
    await page.waitForTimeout(1000);
    await favBtnOnCard.first().click();
    await page.waitForTimeout(1000);
    await favBtnOnCard.nth(1).click();
    await page.waitForTimeout(2000);
    expect(await headerFavCounter.textContent()).toEqual('2');
    await headerFavCounter.click();
    expect(await allCards.evaluateAll((cards) => cards.length)).toBe(2);
    await headerMarvelLogo.click();
    await page.waitForTimeout(2000);
    expect(await allCards.evaluateAll((cards) => cards.length)).toBe(50);
    //Navigate to character Details Page
    //request required data
    const [characterResponse, characterComicsResponse] = await Promise.all([
      page.waitForResponse((response) =>
        response.url().includes('/characters/1010354')
      ),
      page.waitForResponse((response) =>
        response.url().includes('/characters/1010354/comics')
      ),
      card.click(),
    ]);

    await page.waitForNavigation({ url: `${url}/characters/1010354` });
    await page.waitForTimeout(5000);

    const characterData = await characterResponse.json();
    const characterComics = await characterComicsResponse.json();

    const { data: character } = characterData;
    const { data: characterComicsData } = characterComics;

    if (character?.results > 0 && characterComicsData?.results > 0) {
      expect(await headerFavCounter.textContent()).toEqual('2');
      expect(heroBannerLoading).not.toBeVisible();
      expect(heroBannerLoaded).toBeVisible();
    }
  }
});
