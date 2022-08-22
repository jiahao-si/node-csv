
// Import the package main module
import * as csv from 'csv'
import {  createWriteStream } from 'fs';

// Generate 20 records
const generator = csv.generate({
  delimiter: '|',
  length: 20
})
// Transform CSV data into records
const parser = csv.parse({
  delimiter: '|'
})
// Transform each value into uppercase
const transformer = csv.transform((record) => {
   return record.map((value) => {
     return value.toUpperCase()
   });
})
// Convert objects into a stream
const stringifier= csv.stringify({
  cast: {
    string: (value, context) => {
      // to test emoji
      return context.index % 2 ? '🤔' : value.toUpperCase();
    }
  },
  quoted: true,
  // add bom_utf8
  bom: true
})

const writeCsv = createWriteStream('1.csv');

// Run the pipeline
generator
.pipe(parser)
.pipe(transformer)
.pipe(stringifier)
.pipe(writeCsv)
