import {Page} from '@playwright/test'

export class HelperBase{
     readonly page
    constructor(page:Page)
    {
        this.page=page
    }
    async waitForSeconds(sec:number)
    {
        await this.page.waitForTimeout(sec*1000)
    }
}