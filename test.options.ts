import {test as base} from '@playwright/test'
import { PageObjectManager } from '../pw-practice-app/Page_Object_Model/pageobjectmanger'
export type TestOptions={
  globalsQaURL:string
  formLayout:string
  pageManager:PageObjectManager
}
export const test=base.extend<TestOptions>(
    {globalsQaURL:['',{option:true}],
  formLayout:(async ({page}, use) => {
    await page.goto('/');
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
    use('')
  }),
  pageManager:(async({page},use)=>
  {
    const pm=new PageObjectManager(page)
    use(pm)
  })
  
  
    }

)
