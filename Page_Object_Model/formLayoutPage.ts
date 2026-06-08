import {Page} from '@playwright/test'

export class  FormNavigation{
    readonly page:Page;
    constructor(page:Page)
    {
        this.page=page
    }
    async actionOnUsingTheGridForm(email:string,password:string,radio:string)
    {
        const form=await this.page.locator('nb-card').filter({hasText:"Using the Grid"})
        await form.getByRole('textbox',{name:'Email'}).fill(email)
        await form.getByRole('textbox',{name:'Password'}).fill(password)
        await form.getByRole('radio',{name:radio}).check({force:true})
        await form.getByRole('button').click()

    }
    async actionOnInlineForm(name:string,email:string,remeber_me:boolean)
    {
         const form=await this.page.locator('nb-card').filter({hasText:"Inline form"})
         await form.getByRole('textbox',{name:'Jane Doe'}).fill(name)
         await form.getByRole('textbox',{name:'Email'}).fill(email)
         if(remeber_me)
            await form.getByRole('checkbox').check({force:true})
       await form.getByRole('button').click()
    }

}