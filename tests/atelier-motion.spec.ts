import {expect,test} from '@playwright/test';

test('the press advances by itself, holds a chosen print and resumes',async({page})=>{
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.goto('/');
 const stage=page.locator('.impressao-campo');
 await expect(stage).toHaveAttribute('data-prova','mesa',{timeout:15000});
 await stage.getByRole('button',{name:'Na gravura'}).click();
 const progress=()=>stage.evaluate(el=>(el as HTMLElement).style.getPropertyValue('--andamento'));
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
 expect(await stage.evaluate(el=>Number((el as HTMLElement).style.getPropertyValue('--andamento')))).toBe(0);
});
