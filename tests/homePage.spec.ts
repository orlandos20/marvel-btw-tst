import { test, expect } from '@playwright/test';

const url = 'http://localhost:5173';

test.describe('Get all E2E flow ', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(url);
  });

  test('Home page layout section is showed correctly', async ({ page }) => {
    await expect(page.locator('#section-content')).toBeDefined();
  });

  test('50 results are showed in home after initial load ', async ({
    page,
  }) => {
    const allCards = await page.locator('.card');
    const card = await page
      .locator('.card .card--footer__description--name')
      .first();

    //Cards loading
    const loadingSkeleton = page.locator('.img-loading');

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

    expect(
      await card.evaluate((node) => node?.firstElementChild?.textContent)
    ).toBe('Adam Warlock');

    expect(await allCards.evaluateAll((cards) => cards.length)).toBe(50);
  });

  test('results loaded and can navigate to character details page ', async ({
    page,
  }) => {
    const card = await page
      .locator('.card .card--footer__description--name')
      .first();
    //Request made.
    const response = await page.waitForResponse((response) =>
      response.url().includes('/public/characters')
    );
    const responseBody = await response.json();

    if (responseBody.code === 200 && responseBody.data.results.length > 0) {
      const { data } = responseBody;
      const { results } = data;

      expect(
        await card.evaluate((node) => node?.firstElementChild?.textContent)
      ).toBe(results[0]?.name);

      if (
        (await card.evaluate(
          (node) => node?.firstElementChild?.textContent
        )) === results[0]?.name
      ) {
        await card.click();
        await expect(page).toHaveURL(`${url}/characters/${results[0]?.id}`);
      }
    }
  });

  test('Character Details page renders required data correctly ', async ({
    page,
  }) => {
    const characterUrl = `${url}/characters/1010354`;

    await page.goto(characterUrl);

    const heroBannerLoading = await page.locator('.hero-section--img-loading');
    const heroBannerLoaded = await page.locator(
      '.hero-section--container__image'
    );

    expect(heroBannerLoading).toBeVisible();
    expect(heroBannerLoaded).not.toBeVisible();

    //request required data
    const characterResponse = await page.waitForResponse((response) =>
      response.url().includes('/characters/1010354')
    );
    const characterComicsResponse = await page.waitForResponse((response) =>
      response.url().includes('/characters/1010354/comics')
    );

    const characterData = await characterResponse.json();
    const characterComics = await characterComicsResponse.json();

    if (characterData.code === 200 && characterComics.code === 200) {
      const { data: character } = characterData;
      const { data: characterComicsData } = characterComics;

      if (character?.results > 0 && characterComicsData?.results > 0) {
        expect(heroBannerLoading).not.toBeVisible();
        expect(heroBannerLoaded).toBeVisible();
      }
    }
  });
});
