import { test, expect } from '@playwright/test';

const url = 'http://localhost:5173';
const characterUrl = `${url}/characters/1010354`;

test.describe('Get all E2E flow ', () => {
  let characterData;
  let characterComics;

  test.beforeEach(async ({ page }) => {
    await page.goto(characterUrl);

    //request required data
    const characterResponse = await page.waitForResponse((response) =>
      response.url().includes('/characters/1010354')
    );
    const characterComicsResponse = await page.waitForResponse((response) =>
      response.url().includes('/characters/1010354/comics')
    );

    characterData = await characterResponse.json();
    characterComics = await characterComicsResponse.json();
  });

  test('Character Details page renders required data correctly ', async ({
    page,
  }) => {
    const heroBannerLoading = await page.locator('.hero-section--img-loading');
    const heroBannerLoaded = await page.locator(
      '.hero-section--container__image'
    );

    const { data: character } = characterData;
    const { data: characterComicsData } = characterComics;

    if (character?.results > 0 && characterComicsData?.results > 0) {
      expect(heroBannerLoading).not.toBeVisible();
      expect(heroBannerLoaded).toBeVisible();
    }
  });

  test('Add character to favorites from Details Page ', async ({ page }) => {
    const titleSection = await page.getByTestId('favorite-icon');

    const headerFavCounter = await page.getByTestId('fav-counter');
    await headerFavCounter.evaluate((node) => node.innerHTML);

    expect(await headerFavCounter).toHaveText('');
    await titleSection.click();
    await headerFavCounter.evaluate((node) => node.innerHTML);
    expect(await headerFavCounter).toHaveText('1');
  });

  test('Remove character to favorites from Details Page ', async ({ page }) => {
    const titleSection = await page.getByTestId('favorite-icon');
    await titleSection.click();

    const headerFavCounter = await page.getByTestId('fav-counter');
    await headerFavCounter.evaluate((node) => node.innerHTML);

    expect(await headerFavCounter).toHaveText('1');
    await titleSection.click();
    await headerFavCounter.evaluate((node) => node.innerHTML);
    expect(await headerFavCounter).toHaveText('');
  });
});
