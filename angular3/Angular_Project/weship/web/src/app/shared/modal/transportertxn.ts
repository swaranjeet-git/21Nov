export class TransporterTxn{
    id:number;
    listingId:number;
    userId:String;
    shipperId:String;
    bid:Bid
    status:String
    createDate:Date;
    modifyDate:Date;
}

export class Bid{
    id:number;
    amount:number;
    date:Date;
    listId:number;
    shipperId:string
    transId:String
    transFName:String;
    transLName:String;
    transMobile:String;
    transEmail:String;
}