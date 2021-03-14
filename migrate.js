#!/usr/bin/env node
//File for creating a migration script
//To run execute command
//node migrate.js yourfilename
//filename to (timestamp)-yourfilename.ts';
//should be written to src/migrations/
const fs = require("fs");
const moment = require("moment");

if (process.argv[2] == null) {
  console.log("Must supply a filename");
  process.exit();
}

let content =
  "import { Migration } from '@mikro-orm/migrations';\n\n" +
  "export class Migration20210313222915 extends Migration {\n" +
  "  async up(): Promise<void> {\n\n  }\n\n" +
  "  async down(): Promise<void> {\n\n  }\n}";

let description = process.argv[2];
const filename =
  moment.utc().format("YYYYMMDDHHmmss") + "-" + description + ".ts";
const fullFile = __dirname + "/src/migrations/" + filename;

fs.writeFile(fullFile, content, (err) => {
  if (err) throw err;

  console.log(`file saved to ${fullFile}`);
});
