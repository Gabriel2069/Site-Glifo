import {expect,test} from '@playwright/test';

test('the press advances by itself, holds a chosen print and resumes',async({page})=>{
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.goto('/');
 const stage=page.locator('.impressao-campo');
 await expect(stage).toHaveAttribute('data-prova','mesa',{timeout:15000});
 await stage.getByRole('button',{name:'Na gravura'}).click();
 const progress=()=>stage.locator('[aria-pressed=true] .tempo-cena').evaluate(el=>getComputedStyle(el).transform);
 const held=await progress();
 await page.waitForTimeout(350);
 expect(await progress()).toBe(held);
 await stage.getByRole('button',{name:'Retomar sequência'}).click();
 await expect(stage).toHaveAttribute('data-prova','matriz',{timeout:15000});
});

test('reduced motion keeps the first print still and every view accessible',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/');
 const stage=page.locator('.impressao-campo');
 await expect(stage.locator('[data-impressao-play]')).toBeHidden();
 await expect(stage).toHaveAttribute('data-prova','matriz');
 await stage.getByRole('button',{name:'Na mesa'}).click();
 await expect(stage).toHaveAttribute('data-prova','mesa');
 await expect(stage.locator('[data-vista=mesa] .tempo-cena')).toHaveCSS('transform','matrix(0, 0, 0, 1, 0, 0)');
});

test('a slow sheet keeps the previous image in place until the swap',async({page})=>{
 let release!:()=>void;
 const hold=new Promise<void>(resolve=>release=resolve);
 await page.route(/\/brand\/oficio\/mesa-(panoramica|do-atelie-800)\.webp$/,async route=>{
  await hold;
  await route.continue();
 });
 try {
  await page.goto('/',{waitUntil:'domcontentloaded'});
  const stage=page.locator('.impressao-campo');
  await expect(stage.locator('[data-impressao-play]')).toBeVisible();
  await stage.getByRole('button',{name:'Na mesa'}).click();
  await expect(stage).toHaveAttribute('data-prova','matriz');
  await expect(stage.locator('.matriz-cena')).toBeVisible();
  release();
  await expect(stage).toHaveAttribute('data-prova','mesa');
  await expect(stage.locator('[data-outgoing]')).toHaveCount(0);
 } finally {release()}
});
