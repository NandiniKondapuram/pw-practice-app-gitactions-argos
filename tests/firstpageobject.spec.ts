import {test,expect} from '@playwright/test'
import {fa, faker} from '@faker-js/faker'
import { argosScreenshot } from "@argos-ci/playwright";
import { PageObjectManager } from '../Page_Object_Model/pageobjectmanger'
test.beforeEach(async({page})=>{
    await page.goto('/')
})

test('navigate to form',async({page})=>{
   const pm=new PageObjectManager(page)
   await pm.navigateTo().formlayoutdirection()
   await pm.navigateTo().datepickerdirection()
   await pm.navigateTo().toastrpage()
   await pm.navigateTo().tooltippage()
   await pm.navigateTo().smarttable()
})
test('form layout',async({page})=>{
   const random_fullname=faker.person.fullName()
   const random_email=`${random_fullname.replace(' ','')}${faker.number.int(1000)}@test.com`
   const pm=new PageObjectManager(page)
   await pm.navigateTo().formlayoutdirection()
   await pm.formLayout().actionOnUsingTheGridForm('test@test.com','Welcome*23','Option 2')
   //await page.screenshot({path:'screenshots/usergiddata.png'})
   await pm.formLayout().actionOnInlineForm(random_fullname,random_email,false)
   //await page.locator('nb-card').filter({hasText:"Inline form"}).screenshot({path:'screenshots/inlineform.png'})
})
test('Date picker',async({page})=>{
    const pm=new PageObjectManager(page)
      await pm.navigateTo().datepickerdirection()
      await pm.datePicker().commonDatePicker(7)
      await pm.datePicker().datePickerWithRange(8,13)
})
test.only('Github Actions',async({page})=>{
   const pm=new PageObjectManager(page)
   await pm.navigateTo().formlayoutdirection()
   await argosScreenshot(page, "form Layout page");
   await pm.navigateTo().datepickerdirection()
   await argosScreenshot(page, "Date picker page");
})