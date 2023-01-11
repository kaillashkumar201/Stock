import * as mongodb from "mongodb";

export interface Stock {
    v_no: string;
    p_no: string;
    s_no: string;
    desc: string;
    name: string;
    datePurchase: string;
    year: string;
    purchaseValue: string;
    transfer: string;
    invoice_no: string;
    _id?: mongodb.ObjectId;
}
