/* eslint-disable @typescript-eslint/no-var-requires */
// Copyright 2017-2019 @polkadot/apps authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

const fs = require('fs');
const path = require('path');

module.exports = function findPackages () {
  const pkgRoot = path.join(__dirname, '..', 'packages');

  return fs
    .readdirSync(pkgRoot)
    .filter((entry) => {
      const pkgPath = path.join(pkgRoot, entry);

      return !['.', '..'].includes(entry) &&
        fs.lstatSync(pkgPath).isDirectory() &&
        fs.existsSync(path.join(pkgPath, 'package.json'));
    })
    .filter((entry)=> {
      const packs= ['apps', 'app-explorer', 'apps-routing', 'app-contracts', 'react-api', 'react-query', 'react-params', 'react-components', 'react-signer'];

      return packs.indexOf(entry)> 0;
    })
    .map((dir) => {
      const jsonPath = path.join(pkgRoot, dir, 'package.json');
      const { name } = JSON.parse(
        fs.readFileSync(jsonPath).toString('utf-8')
      );

      return { dir, name };
    });
};
