import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Stock } from '../stock';

@Component({
  selector: 'app-stock-form',
  template: `
    <div class="container" >
      <div class="row d-flex justify-content-center">
      <form class="stock-form col-sm-12" autocomplete="off" [formGroup]="stockForm" (ngSubmit)="submitForm()">
      <div class="container justify-content-center align-items-center" style="padding: 0px;margin:0px;">
        <div class="row justify-content-center align-items-center">
        <div class="form-floating mb-3 row col-md-4 col-sm-4" >
          <div><label for="stock_id">Vol No: </label></div>
          <div><input class="form-control" type="text" id="v_no" formControlName="v_no" placeholder="Volume no"></div>
      </div>

      <div class="form-floating mb-3 row col-md-4 col-sm-4 col-xs-12">
          <div><label for="stock_id">Page No: </label></div>
          <div><input class="form-control" type="text" id="p_no" formControlName="p_no"></div>
      </div>

      <div class="form-floating mb-3 row col-md-4 col-sm-4 col-xs-12">
          <div><label for="stock_id">Serial No: </label></div>
          <div><input class="form-control" id="s_no" type="text" formControlName="s_no"></div>
      </div>
        </div>
      </div>

      <div class="form-floating mb-3 row col-xs-12">
          <div><label for="name">Name: </label></div>
          <div><input class="form-control" type="text" id= "name" formControlName="name"></div>
      </div>

      <div class="form-floating mb-3 row col-xs-12">
          <div><label for="desc">Description: </label></div>
          <div><textarea class="form-control" type="text" id= "desc" formControlName="desc" rows="5" style="height: 130px"></textarea></div>
      </div>

      <div class="form-floating mb-3 row col-xs-12">
          <div><label for="datePurchase">Date of Purchase: </label></div>
          <div><input class="form-control" type="date" id= "datePurchase" formControlName="datePurchase"></div>
      </div>

      <div class="form-floating mb-3 row col-xs-12">
          <div><label for="purchaseValue">Purchase Value: </label></div>
          <div><input class="form-control" type="text" id= "purchaseValue" formControlName="purchaseValue"></div>
      </div>

      <div class="form-floating mb-3 row col-xs-12">
          <div><label for="transfer">Transfer: </label></div>
          <div><input class="form-control" type="text" id= "transfer" formControlName="transfer"></div>
      </div>

      <div class="form-floating mb-3 row col-xs-12">
          <div><label for="invoice_no">Invoice No: </label></div>
          <div><input class="form-control" type="text" id="invoice_no" formControlName="invoice_no"></div>
        </div>

      <button class="btn btn-primary" type="submit" [disabled]="stockForm.invalid">Add</button>
    </form>
      </div>
    </div>
  `,
  styles: [
    `.employee-form {
      max-width: 560px;
      margin-left: auto;
      margin-right: auto;
    }
    form
    {
      width:100%;
    }

    @media screen and (min-width: 1000px) {
      form
      {
        width:55%;
        padding:25px;
        margin-bottom:30px;
        border:1px solid lightgray;
        border-radius:10px;
        background:lightgray;
        box-shadow:1px  0px 13px 1px grey;
      }
  
}
    
    `
  ]
})
export class StockFormComponent implements OnInit {
  @Input()
  initialState: BehaviorSubject<Stock> = new BehaviorSubject<Stock>({});

  @Output()
  formValuesChanged = new EventEmitter<Stock>();

  @Output()
  formSubmitted = new EventEmitter<Stock>();


  constructor(private formBuilder: FormBuilder) { }

  stockForm: FormGroup = new FormGroup({});

  get stockV_no() { return this.stockForm.get('v_no')!; }
  get stockP_no() { return this.stockForm.get('p_no')!; }
  get stockS_no() { return this.stockForm.get('s_no')!; }
  get stockDesc() { return this.stockForm.get('desc')!; }
  get stockName() { return this.stockForm.get('name')!; }
  get stockDatePurchase() { return this.stockForm.get('datePurchase')!; }
  get stockPurchaseValue() { return this.stockForm.get('purchaseValue')!; }
  get stockTransfer() { return this.stockForm.get('transfer')!; }
  get stockInvoiceNo() { return this.stockForm.get('invoice_no')! ; }

  ngOnInit(): void {
    this.initialState.subscribe(stock => {
      this.stockForm = this.formBuilder.group({
        v_no: [stock.v_no, Validators.required],
        p_no: [stock.p_no, Validators.required],
        s_no: [stock.s_no, Validators.required],
        name: [stock.name, Validators.required],
        desc: [stock.desc, Validators.required],
        datePurchase: [stock.datePurchase, Validators.required],
        purchaseValue: [stock.purchaseValue, Validators.required],
        invoice_no: [stock.invoice_no, Validators.required],
        transfer: [stock.transfer, ]
      });
    });
    this.stockForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }

  submitForm() {
    this.formSubmitted.emit(this.stockForm.value);
  }
}
