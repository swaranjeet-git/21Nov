export class LocationUtility {

    public locConverter(loc) {
        const address: Address = new Address();
        loc = JSON.parse(loc);
        // console.log(loc);
        let temp;

        temp =
            (<Location[]>loc.address).filter((element: Location) => {
                return element.types.indexOf('sublocality_level_1') >= 0 && element.types.indexOf('sublocality') >= 0;
            });
        address.sublocality1 = temp && temp.length > 0 ? temp[0].short_name : '';
        temp =
            (<Location[]>loc.address).filter((element: Location) => {
                return (element.types.indexOf('sublocality_level_2') >= 0 ||
                 element.types.indexOf('sublocality_level_3') >= 0) && element.types.indexOf('sublocality') >= 0;
            });
        address.sublocality2 = temp && temp.length > 0 ? temp[0].short_name : '';
        temp =
            (<Location[]>loc.address).filter((element: Location) => {
                return element.types.indexOf('locality') >= 0;
            });
        address.locality = temp && temp.length > 0 ? temp[0].short_name : '';
        temp =
            (<Location[]>loc.address).filter((element: Location) => {
                return element.types.indexOf('administrative_area_level_2') >= 0;
            });
        address.administrative_area_level_2 = temp && temp.length > 0 ? temp[0].short_name : '';
        temp =
            (<Location[]>loc.address).filter((element: Location) => {
                return element.types.indexOf('administrative_area_level_1') >= 0;
            });
        address.administrative_area_level_1 = temp && temp.length > 0 ? temp[0].short_name : '';
        temp =
            (<Location[]>loc.address).filter((element: Location) => {
                return element.types.indexOf('country') >= 0;
            });
        address.country = temp && temp.length > 0 ? temp[0].short_name : '';
        temp =
            (<Location[]>loc.address).filter((element: Location) => {
                return element.types.indexOf('postal_code') >= 0;
            });
        address.postal_code = temp && temp.length > 0 ? temp[0].short_name : '';
        // console.log(address);

        return address;
    }
}
export class Location {
    long_name: string;
    short_name: string;
    types: string[];

}
export class Address {
    sublocality1: string;
    sublocality2: string;
    locality: string;
    administrative_area_level_2: string;
    administrative_area_level_1: string;
    country: string;
    postal_code: string;
}
