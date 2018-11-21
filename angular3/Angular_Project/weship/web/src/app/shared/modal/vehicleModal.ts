
  export class VehicleMaster {
    id: number;
    vehicleName: string;
    brandName: string;
    type: string;
    size: string;
    capacity: string;
    imageUrl: string;
    parent: VehicleMaster;
  }
  export class VehicleDoc {
    id: number;
    docNo: string;
    desc: string;
    documentType: DocumentType;
  }
  export class DocumentType {
    id: number;
    docType: string;
  }
  