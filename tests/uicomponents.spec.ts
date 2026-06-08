import {test,expect} from '@playwright/test'
import { Exception } from 'sass'

test.beforeEach(async({page})=>{
  await page.goto('/')
})
//Input field
test('input field',async({page})=>{
    //test.describe.configure({retries:2})
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
    const basic_form=await page.locator('nb-card',{hasText:"Basic form"}).getByRole('textbox',{name:'Email'})
    await basic_form.fill('test@test.com')
    await basic_form.clear()
    await basic_form.pressSequentially('test@test.com',{delay:500})
    const text= await  basic_form.inputValue()
    expect(text).toEqual('test@test.com')
    expect(basic_form).toHaveValue('test@test.com')
})
//Radio Buttons
test('radio buttons',async({page})=>{
     await page.getByText('Forms').click()
     await page.getByText('Form Layouts').click()
    const radio_buttons= await page.locator('nb-card').filter({hasText:"Using the Grid"})
    const option1= await radio_buttons.getByRole('radio',{name:'Option 1'}).check({force:true})
    const status= await radio_buttons.getByLabel('Option 1').isChecked()
    expect(status).toBeTruthy()
    const option2=await radio_buttons.getByRole('radio',{name:'Option 2'}).check({force:true})
    const status1= await radio_buttons.getByLabel('Option 1').isChecked()
    expect(status1).toBeFalsy()
    
})
//Checkboxes

test('check boxes',async({page})=>{
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()
    const checkboxes=await page.locator('nb-card nb-checkbox')
    await checkboxes.getByRole('checkbox',{name:'Hide on click'}).click({force:true})
    await checkboxes.getByRole('checkbox',{name:'Hide on click'}).check({force:true})

    for(let box of await checkboxes.all())
    {
        await box.getByRole('checkbox').check({force:true})
    }
    for(let unbox of await checkboxes.all())
    {
        await unbox.getByRole('checkbox').uncheck({force:true})
    }
})

//List and dropdowns
test('List and dropdowns',async({page})=>{
     
   await  page.locator('nb-layout-header .select-button').click({force:true})

   page.getByRole('list')
   const option_list=await page.locator('nb-option-list nb-option')
   await expect(option_list).toHaveText(["Light","Dark","Cosmic","Corporate"])
   await option_list.filter({hasText:'Cosmic'}).click()
   await expect(page.locator('nb-layout-header')).toHaveCSS('background-color','rgb(50, 50, 89)')
   await  page.locator('nb-layout-header .select-button').click({force:true})

   const background={
    "Light":'rgb(255, 255, 255)',
    "Dark":'rgb(34, 43, 69)',
    "Cosmic":'rgb(50, 50, 89)',
    "Corporate":'rgb(255, 255, 255)'
   }
   for(const color in background)
   {
     await option_list.filter({hasText:color}).click({force:true})
      await expect(page.locator('nb-layout-header')).toHaveCSS('background-color',background[color])
      if(color=='Corporate')
      {

      }
      else{
     await  page.locator('nb-layout-header .select-button').click({force:true})
      }
     
   }

})

//Tool tips
test('tooltip',async({page})=>
{
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()
    const toolTipCard=await page.locator('nb-card',{hasText:'Tooltip Placements'})
    const top=  await toolTipCard.getByRole('button',{name:'Top'})
    await top.hover()
    const tooltipmss=await page.locator('nb-tooltip').textContent()
    expect(tooltipmss).toEqual('This is a tooltip')
    
    const toolTipCard2=await page.locator('nb-card',{hasText:'Colored Tooltips'})
    const success=  await toolTipCard2.getByRole('button',{name:'Success'})
    await success.hover()
    const tooltipmsscolor=await page.locator('.status-success')
    await expect(tooltipmsscolor).toHaveCSS('background','rgb(0, 214, 143) none repeat scroll 0% 0% / auto padding-box border-box')
    await expect( await tooltipmsscolor.textContent()).toEqual('This is a tooltip')
})

test('Dialog boxes',async({page})=>{
   await page.getByText('Tables & Data').click()
   await page.getByText('Smart Table').click()
   //Listener
   page.on('dialog',dialog=>
   {
    expect(dialog.message()).toEqual('Are you sure you want to delete?')
    dialog.accept()
   }
   )
   await page.locator('table').locator('tr').filter({hasText:'mdo@gmail.com'}).locator('.nb-trash').click()
   await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com')
   
})

test('Web Element',async({page})=>
{
     await page.getByText('Tables & Data').click()
     await page.getByText('Smart Table').click()

     //Get the row by getByRole row
    const ro=  page.getByRole('row',{name:'twitter@outlook.com'})
    await ro.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('Age').clear()
    await page.locator('input-editor').getByPlaceholder('Age').fill('45')
    await page.locator('.nb-checkmark').click()
    expect(await ro.filter({has:await page.locator('td').last()})).not.toHaveText('18')
     //Get the row by column
     await page.getByRole('list').getByRole('listitem').filter({hasText:'2'}).click()
     const row=await page.getByRole('row',{name:'11'}).filter({has:page.locator('td').nth(1).getByText('11')})
     await row.locator('.nb-edit').click()
     await page.locator('input-editor').getByPlaceholder('Age').clear()
    await page.locator('input-editor').getByPlaceholder('Age').fill('70')
    await page.locator('.nb-checkmark').click()
    expect(await row.filter({has:await page.locator('td').last()})).not.toHaveText('38')

    //Searching the rows

    const ages=["99","20","40","200"]
    for(const age of ages)
    {
        await page.locator('input-filter').getByPlaceholder('Age').clear()
        await page.locator('input-filter').getByPlaceholder('Age').fill(age)
        await page.waitForTimeout(500)
        
       const agecol= await page.locator('tbody tr')
       for(const age1 of await agecol.all())
       {
         if(age=="99" || age == "200")
        {
            await expect(await page.getByRole('table').textContent()).toContain(' No data found ')
        }
        else{
       const col=await agecol.locator('td').last().textContent()
       await expect(col).toEqual(age)
        }
       }
    }
})

test('Date picker',async({page})=>{
     await page.getByText('Forms').click()
     await page.getByText('Datepicker').click()
     let date=new Date();
     const current_month=date.toLocaleString('En-US',{month:'long'})
     date.setDate(date.getDate()+14)
    const form_picker= await page.locator('nb-card').getByPlaceholder('Form Picker')
     await form_picker.click()
     const expected_date=date.getDate().toString()
     const expected_month=date.toLocaleString('En-US',{month:'short'})
     const expected_year=date.getFullYear()
     const dateTobe=`${expected_month} ${expected_date}, ${expected_year}`
     const expectedcal_month=date.toLocaleString('En-US',{month:'long'})
     let CalanderMonthAndYear=await page.locator('nb-calendar-view-mode').textContent()
     const expectedmonthandyear=` ${expectedcal_month} ${expected_year} `
     if(!CalanderMonthAndYear)
     {
        throw new Error('Calander month and year is not found')
     }
     while(!CalanderMonthAndYear.includes(expectedmonthandyear))
     {
       
        await page.locator('nb-calendar-pageable-navigation .next-month').click()
        CalanderMonthAndYear=await page.locator('nb-calendar-view-mode').textContent()  
        if(!CalanderMonthAndYear)
        {
            throw new Error('Calender month/year element lost after navigation')
        }
        
       //      await page.locator('nb-calendar-pageable-navigation .prev-month').click()
        // CalanderMonthAndYear=await page.locator('nb-calendar-view-mode').textContent() 
        
     }
     
     await page.locator('.day-cell').getByText(expected_date,{exact:true}).click()
     //console.log(await form_picker.inputValue())
     await page.waitForTimeout(500)
     const input_Value=await form_picker.inputValue()
     await expect(input_Value).toEqual(dateTobe)


})

test('Sliders',async({page})=>{
    //Update attribute
//    const tempguage=await page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
//    tempguage.evaluate(node=>{
//     node.setAttribute('cx','232.630')
//     node.setAttribute('cy','232.630')
//    })
//    await tempguage.click()
   
   //Mouse Movement

   const tempbox=await page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
   await tempbox.scrollIntoViewIfNeeded()
   const box= await tempbox.boundingBox()
   if(!box)
   { 
    throw new Error('Temperaturature box is not found')
   }
 //To start from center
   const x=box.x+box.width/2
   const y=box.y+box.height/2
   await page.mouse.move(x,y)
   await page.mouse.down()
   await page.mouse.move(x+100,y)
   await page.mouse.move(x+100,y+100)
   await page.mouse.up()
   expect(tempbox).toContainText('30')
})

