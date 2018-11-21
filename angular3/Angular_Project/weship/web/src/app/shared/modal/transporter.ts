import { VehicleDoc, VehicleMaster } from "./vehicleModal";
import { User } from "./user";

export class Transporter {
    id: number;
    companyDetails: CompanyDetails;
    interestedIn = [];
    user: User;
    vehicles: VehicleDetail[];
    }
  
export class CompanyDetails {
    id: number;
    companyName: string;
    address: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  
  }
  
  
  export class  VehicleDetail{
    id: number;
    vehicleRegNo: string;
    vehicleMaster: VehicleMaster = new VehicleMaster();
    vehicleDoc: VehicleDoc = new VehicleDoc();
  
  }