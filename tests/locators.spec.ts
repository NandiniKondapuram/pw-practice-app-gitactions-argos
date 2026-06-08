import {expect, test} from '@playwright/test'

test.beforeEach(async({page})=>
{
  await page.goto('/')
  await page.getByText('Forms').click()
  await page.getByText('Form Layouts').click()
})

test('Locator examples',async({page})=>
{
    //By tagname
    page.locator('input')

    //By id
    await page.locator('#inputEmail1')

    //By class
    await page.locator('.status-basic')
    //By attributes
    page.locator('[placeholder="Email"]')
    //By full class value
    await page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //By xpath(not recomended)
    await page.locator('//*[@id="inputEmail1"]').click()

    //By partial text
    await page.locator(':text("Using")').click()

    //By full text
    page.locator(':text-is("Using the Grid")')
})

test('User facing locators',async({page})=>
{
    await page.getByRole('textbox',{name:'Email'}).first().click()
    await page.getByLabel('Email').nth(1).click()
    await page.getByPlaceholder('Email').nth(2).click()
    await page.getByTestId('SignIn').click()
})

test('Child Elements',async({page})=>{
    await page.locator('nb-card nb-radio :text-is("Option 1")').click() //or
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()
    //await page.locator('nb-card').nth(0)
})

test('Parent Element',async({page})=>
{
    await page.locator('nb-card',{hasText:"Basic form"}).getByRole('textbox',{name:'Email'}).click()
    //Or await page.locator('nb-card').filter({hasText:"Basic form"})
    await page.locator('nb-card').filter({has:page.locator('nb-checkbox')}).locator(':text-is("Sign in")').click()
})

//Reusing locators
test('Reusing locators',async({page})=>
{
    const basic_form=await page.locator('nb-card').filter({hasText:"Basic form"})
    const email_text=await basic_form.getByRole('textbox',{name:'Email'})
    //email_text.click()
    await email_text.fill('example@gmail.com')
    expect(email_text).toHaveValue('example@gmail.com')
    console.log(await basic_form.locator('nb-card-header').textContent())
})

