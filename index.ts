import { Company } from "./company.ts";

const acme = new Company("ACME", "ARsand", 7);

console.log(acme.toObjectForm);

// canonicalize libray json, in alphabetical order
// bun add canonicalize
// bun add -g
