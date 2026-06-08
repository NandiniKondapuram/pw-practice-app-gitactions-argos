import {test,expect,Page} from '@playwright/test'
import { Navigation } from '../Page_Object_Model/NavigationPage'
import {FormNavigation} from '../Page_Object_Model/formLayoutPage'
import { DatePickerNavigation } from '../Page_Object_Model/datepickerpage'

export class PageObjectManager{
    private readonly page:Page
    private readonly navigation:Navigation
    private readonly formNavigation:FormNavigation
    private readonly datePickerNavigation:DatePickerNavigation
    constructor(page:Page)
    {
        this.page=page
        this.navigation=new Navigation(this.page)
        this.formNavigation=new FormNavigation(this.page)
        this.datePickerNavigation=new DatePickerNavigation(this.page)
    }
    navigateTo()
    {
        return this.navigation
    }
    formLayout()
    {
        return this.formNavigation
    }
    datePicker()
    {
        return this.datePickerNavigation
    }
}