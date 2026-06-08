import {test} from '../test.options'
import {fa, faker} from '@faker-js/faker'
import { PageObjectManager } from '../Page_Object_Model/pageobjectmanger'
test('form layout',async({formLayout,pageManager})=>{
   const random_fullname=faker.person.fullName()
   const random_email=`${random_fullname.replace(' ','')}${faker.number.int(1000)}@test.com`
   await pageManager.navigateTo().formlayoutdirection()
   await pageManager.formLayout().actionOnUsingTheGridForm('test@test.com','Welcome*23','Option 2')
   await pageManager.formLayout().actionOnInlineForm(random_fullname,random_email,false)
})