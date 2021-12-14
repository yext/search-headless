const fs = require('fs');
const packageJson = require('../package.json');

/**
 * The generate-license-file package includes the current repo in the 3rd party notices file.
 * This function removes that license from the file.
 */
function removeRepoLicense() {
  const noticesFile = './THIRD-PARTY-NOTICES';

  const noticesFileContents = fs.readFileSync(noticesFile, 'utf8');
  const noticesWithoutRepoLicense = getNoticesWithoutRepoLicense(noticesFileContents);

  fs.writeFileSync(noticesFile, noticesWithoutRepoLicense);
}

/**
 * Return number of packages that share the same license as the current repo 
 * in the third party notices file
 * @param {string} fileContents The contents of the 3rd party notices file
 * @param {number} licenseStart the index at the start of the repo's license section
 */
function countNumPackagesWithSharedLicense(fileContents, licenseStart) {
  const packageNameRegex = / - .*@.*/;
  let atPackageName = true;
  let currentFileIndex = licenseStart + packageNameRegex.exec(fileContents.slice(licenseStart)).index;
  let numPackagesWithSharedLicense = 0;
  while (atPackageName) {
    const line = fileContents.slice(currentFileIndex, fileContents.indexOf('\n', currentFileIndex));
    atPackageName = packageNameRegex.test(line);
    if (atPackageName) {
      numPackagesWithSharedLicense++;
    }
    currentFileIndex += line.length + 1;
  }
  return numPackagesWithSharedLicense;
}

/**
 * Removes the repo's package name and/or library license from the 3rd party
 * notices file contents and returns the updated file as a string
 *
 * @param {string} fileContents The contents of the 3rd party notices file
 * @returns {string}
 */
function getNoticesWithoutRepoLicense(fileContents) {
  const repoLine = ` - ${packageJson.name}@${packageJson.version}\n`;
  const divider = '-----------\n';

  const startIndexOfRepoLine = fileContents.indexOf(repoLine);
  if (startIndexOfRepoLine === -1) {
    return fileContents;
  }

  // determine how many packages share the same license as current repo
  const startIndexOfRepoDivider = fileContents.lastIndexOf(divider, startIndexOfRepoLine);
  const startIndexOfRepoLicense = startIndexOfRepoDivider === -1 ? 0 : startIndexOfRepoDivider + divider.length;
  const endIndexOfRepoLicense = fileContents.indexOf(divider, startIndexOfRepoLicense) + divider.length;
  const numPackagesWithSharedLicense = countNumPackagesWithSharedLicense(fileContents, startIndexOfRepoLicense);

  if (numPackagesWithSharedLicense === 1) {
    // remove repo's license
    return fileContents.slice(0, startIndexOfRepoLicense) + fileContents.slice(endIndexOfRepoLicense);
  } else {
    // remove repo's package name
    let repoLicenseSection = fileContents.slice(startIndexOfRepoLicense, endIndexOfRepoLicense);
    repoLicenseSection = repoLicenseSection.replace(repoLine, '');

    if (numPackagesWithSharedLicense === 2) {
      repoLicenseSection = repoLicenseSection.replace(
        'The following NPM packages may be included in this product:', 
        'The following NPM package may be included in this product:');
        repoLicenseSection = repoLicenseSection.replace(
        'These packages each contain the following license and notice below:', 
        'This package contains the following license and notice below:'
      );
    }
    const contentsBeforeRepoLicense = fileContents.slice(0, startIndexOfRepoLicense)
    const contentsAfterRepoLicense = fileContents.slice(endIndexOfRepoLicense);
    return contentsBeforeRepoLicense + repoLicenseSection + contentsAfterRepoLicense;
  }
}

removeRepoLicense();