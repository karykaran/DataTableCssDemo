import { LightningElement,wire } from 'lwc';
import getAccounts from '@salesforce/apex/TableController.getAccounts'
import {loadStyle} from 'lightning/platformResourceLoader'
import COLORS from '@salesforce/resourceUrl/colors'
const COLUMNS = [
    {label:'Account Name', fieldName:'Name',  cellAttributes:{
        class:{fieldName:'accountColor'}
    }},
    {label:'Annual Revenue', fieldName:'AnnualRevenue', type:'currency', cellAttributes:{
        class:{fieldName:'amountColor'},
        iconName:{fieldName:'iconName'}, iconPosition:'right'
    }},
    {label:'Industry', fieldName:'Industry', type:'text', cellAttributes:{
        class:{fieldName:'industryColor'}
    }},
    {label:'Phone', fieldName:'Phone', type:'phone'},
]

export default class DataTableCustomCss extends LightningElement {
    tableData
    columns = COLUMNS
    isCssLoaded = false

    @wire(getAccounts)
    accountsHandler({data, error}){ 
        if(data){ 
            
            this.tableData = data.map(item=>{
                let amountColor = item.AnnualRevenue < 139000000 ? "":"columnBorder"
                return {...item,
                    "accountColor":amountColor
                }
            })
        }
        if(error){
            console.error(error)
        }
    }

    renderedCallback(){ 
        if(this.isCssLoaded) return
        this.isCssLoaded = true
        loadStyle(this, COLORS).then(()=>{
            console.log("Loaded Successfully")
        }).catch(error=>{ 
            console.error("Error in loading the colors")
        })
    }
    
}