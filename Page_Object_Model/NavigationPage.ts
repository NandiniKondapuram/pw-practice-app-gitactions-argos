import {Page} from '@playwright/test'
import { HelperBase } from './Helperbase';

export class Navigation extends HelperBase{
    
    constructor(page:Page)
    {
        super(page)
    }
    
     async formlayoutdirection(){
         this.expandedlist('Forms')
         await this.page.getByText('Form Layouts').click()
         await this.waitForSeconds(2)

    }
    async datepickerdirection(){
     this.expandedlist('Forms')
     await  this.page.getByText('Datepicker').click()
    }
    async toastrpage(){
      this.expandedlist('Modal & Overlays')
     await  this.page.getByText('Toastr').click()
    }

    async tooltippage()
    {
        this.expandedlist('Modal & Overlays')
        await  this.page.getByText('Tooltip').click()
    }

    async smarttable()
    {
         this.expandedlist('Tables & Data')
        await  this.page.getByText('Smart Table').click()

    }
    
    private async expandedlist(data:string)
    {
        const dataitem=this.page.getByTitle(data)
        const dataexpand=await dataitem.getAttribute('aria-expanded')
        if(dataexpand=="false")
            dataitem.click()

    }

}