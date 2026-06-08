import {expect, test} from '@playwright/test'

test.beforeEach(async({page},testInfo)=>
{
  await page.goto(process.env.URL!)
  await page.getByText('Button Triggering AJAX Request').click()
  testInfo.setTimeout(testInfo.timeout+2000)
  
})

test('autowait',async({page})=>
{
    const bg_sucess= page.locator('.bg-success')
         // await bg_sucess.click()
         // const bgsucess=await bg_sucess.textContent()
         // await expect(bgsucess).toEqual('Data loaded with AJAX get request.')
         // bg_sucess.waitFor({state:"attached"})
    ////Wait for perticular element
          await page.waitForSelector('.bg-success')
    ////Wait for specific response
          await page.waitForResponse(process.env.URL!)
    ////wait for network calls to be completed(not recommended)
        await page.waitForLoadState('networkidle')
         //const bgsucesss=await bg_sucess.allTextContents()
         // await expect(bgsucesss).toContain('Data loaded with AJAX get request.')  //returns array so using tocontain

          await expect(bg_sucess).toHaveText('Data loaded with AJAX get request.',{timeout:20000})
   
})
