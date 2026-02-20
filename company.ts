export class Company {
  name: string;
  location: string;
  value?: number;

  constructor(name: string, location: string, value?: number) {
    this.name = name;
    this.location = location;
    this.value = value;
  }
  adjustByPercent(percent: number) {
    if (this.value) this.value += 1 + percent / 100;
  }
  description(): string {
    if (this.value) return "";
    else return "";
  }

  toObjectForm(): CompanyType {
    return {
      name: this.name,
      location: this.location,
      value: this.value,
    };
  }
}

type CompanyType = {
  name: string;
  location: string;
  value?: number;
};
