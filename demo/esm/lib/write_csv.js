import { stringify, transform } from 'csv';
import { createReadStream, createWriteStream } from 'fs';
import { Duplex, Readable } from 'stream';

const writeCsv = createWriteStream('1.csv');

const array = [
  [
    '\t11242341234123423141234123412341234', //使用 \t 可以避免将数字转换成科学计数法
    '211242341234123423141234123412341234\t',
    '311242341234123423141234123412341234 ', // 空格不可以
    ' 411242341234123423141234123412341234',
    '验证中文 test Chinese', // 经过验证，一定要包含 bom: true，否则会乱码
    '🤔test emoji',
  ],
  ['a', 'b', 'c', 'd'],
];

stringify(array).pipe(writeCsv);
