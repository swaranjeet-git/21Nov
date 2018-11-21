export class User {
    id: string;
    fName: string;
    lName: string;
    email: string;
    mobile: string;
    mcountry: string;
    gender:string;
    loginType: string;
    picture:string;
    pwd:string;

    get e164() {
      // const num = this.country + this.area + this.prefix + this.line
      const num = this.mcountry + this.mobile;
      return `+${num}`
  }
  }