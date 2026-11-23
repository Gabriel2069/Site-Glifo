import {expect,test} from '@playwright/test';

test('the light changes the engraving and Escape restores focus',async({page})=>{
 await page.goto('/');
 const opener=page.getByRole('button',{name:'Examinar o relevo'});
 await opener.click();
 const panel=page.getByRole('dialog',{name:'Perfil do Vigia'});
 const canvas=panel.locator('canvas');
 await expect(canvas).toHaveCSS('opacity','1');
 const previous=await canvas.evaluate(c=>(c as HTMLCanvasElement).toDataURL());
 const light=panel.getByRole('slider',{name:'Direção da luz'});
 await light.focus();
 await light.press('End');
 await expect(panel.locator('output')).toHaveText('90°');
 await expect.poll(()=>canvas.evaluate(c=>(c as HTMLCanvasElement).toDataURL())).not.toBe(previous);
 await page.keyboard.press('Escape');
 await expect(panel).not.toBeVisible();
 await expect(opener).toBeFocused();
});

test('the gestures open their corresponding process step',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/');
 await page.locator('[data-gesto-etapa]').last().click();
 await expect(page.locator('#step-tab-2')).toHaveAttribute('aria-selected','true');
 await expect(page.locator('#step-panel-2')).toBeVisible();
});
