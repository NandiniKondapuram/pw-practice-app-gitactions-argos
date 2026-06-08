import {expect, Page} from '@playwright/test'
export class DatePickerNavigation{
    readonly page:Page
    constructor(page:Page)
    {
        this.page=page
    }
    async commonDatePicker(date:number)
    {
      const form_picker= await this.page.locator('nb-card').getByPlaceholder('Form Picker')
      await form_picker.click()
      const dateToBe=await this.daySelect(date)
      const input_Value=await form_picker.inputValue()
      await expect(input_Value).toEqual(dateToBe)
    }

    async datePickerWithRange(startDateFromToday:number,endDateFromToday:number)
    {
        const range_picker= await this.page.locator('nb-card').getByPlaceholder('Range Picker')
        await range_picker.click()
        const dateAssertToStart=await this.daySelect(startDateFromToday)
        const dateAsserToEnd=await this.daySelect(endDateFromToday)
        const dateToBe=`${dateAssertToStart} - ${dateAsserToEnd}`
        const input_Value=await range_picker.inputValue()
        await expect(input_Value).toEqual(dateToBe)

    }
    private async daySelect(day:number)
    {
         let date=new Date();
     const current_month=date.toLocaleString('En-US',{month:'long'})
     date.setDate(date.getDate()+day)
    
     const expected_date=date.getDate().toString()
     const expected_month=date.toLocaleString('En-US',{month:'short'})
     const expected_year=date.getFullYear()
     const dateTobe=`${expected_month} ${expected_date}, ${expected_year}`
     const expectedcal_month=date.toLocaleString('En-US',{month:'long'})
     let CalanderMonthAndYear=await this.page.locator('nb-calendar-view-mode').textContent()
     const expectedmonthandyear=` ${expectedcal_month} ${expected_year} `
    
     while(!CalanderMonthAndYear.includes(expectedmonthandyear))
     {
       
        await this.page.locator('nb-calendar-pageable-navigation .next-month').click()
        CalanderMonthAndYear=await this.page.locator('nb-calendar-view-mode').textContent()  
        
       //      await page.locator('nb-calendar-pageable-navigation .prev-month').click()
        // CalanderMonthAndYear=await page.locator('nb-calendar-view-mode').textContent()  
     }
     
     await this.page.locator('.day-cell.ng-star-inserted').getByText(expected_date,{exact:true}).first().click()
     //console.log(await form_picker.inputValue())
     await this.page.waitForTimeout(500)
     return dateTobe

    }




} 