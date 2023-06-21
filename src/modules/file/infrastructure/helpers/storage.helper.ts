// This file should exist in `src/common/helpers`
const fs = require('fs');
import { join } from 'path';
import { promisify } from 'util';


/**
 * Writes a file at a given path via a promise interface.
 *
 * @param {string} path
 * @param {string} fileName
 * @param {string} data
 *
 * @return {Promise<void>}
 */
export const createDirectoryIfNotExist = async (
  pathOriginal: string,
  directory: string,
): Promise<void> => {
  let newDirectory = directory
  const paths = splitTrailingSlash(pathOriginal)
  for (const path of paths) {
    newDirectory = join(newDirectory, path)
    if (!checkIfFileOrDirectoryExists(newDirectory)) {
      fs.mkdirSync(newDirectory);
    }
  }
};

/**
 * Check if a file exists at a given path.
 *
 * @param {string} path
 *
 * @returns {boolean}
 */
export const checkIfFileOrDirectoryExists = (path: string): boolean => {
  return fs.existsSync(path);
};

/**
 * Gets file data from a given path via a promise interface.
 *
 * @param {string} path
 * @param {string} encoding
 *
 * @returns {Promise<Buffer>}
 */
export const getFile = async (
  path: string,
  encoding: null,
): Promise<string | Buffer> => {
  const readFile = promisify(fs.readFile);

  return encoding ? readFile(path, encoding) : readFile(path, {});
};

/**
 * Writes a file at a given path via a promise interface.
 *
 * @param {string} path
 * @param {string} fileName
 * @param {string} data
 *
 * @return {Promise<void>}
 */
export const createFile = async (
  path: string,
  fileName: string,
  data: Buffer,
): Promise<void> => {
  if (!checkIfFileOrDirectoryExists(path)) {
    fs.mkdirSync(path);
  }

  const writeFile = promisify(fs.writeFile);

  return await writeFile(`${path}/${fileName}`, data, 'utf8');
};

/**
 * Delete file at the given path via a promise interface
 *
 * @param {string} path
 *
 * @returns {Promise<void>}
 */
export const deleteFile = async (path: string): Promise<void> => {
  const unlink = promisify(fs.unlink);
  return await unlink(path);
};

/**
 * Check directory if empty
 *
 * @param {string} directory
 *
 * @returns {Promise<void>}
 */
export const checkIfDirectoryEmpty = async (
  path: string,
): Promise<void> => {
  const newPath = goUp(path)
  if (newPath.endsWith('public')) return
  const readdir = promisify(fs.readdir);
  const files = await readdir(newPath);
  console.log(newPath, files.length)
  if (!files.length) {
    deleteDirectory(newPath)
    checkIfDirectoryEmpty(newPath)
  }
};

/**
 * Delete file at the given path via a promise interface
 *
 * @param {string} path
 *
 * @returns {Promise<void>}
 */
export const deleteDirectory = async (path: string): Promise<void> => {
  const rmdir = promisify(fs.rmdir);
  return await rmdir(path);
};

const stripTrailingSlash = function (str) {
  return str.replace(/[\\/]+$/g, '');
}

const splitTrailingSlash = function (str) {
  return str.replace(/\\/g, '/').split('/');
}

/**
 * GoUp file
 * @param path 
 * @returns 
 */
const goUp = function (path): string {
  //
  if (path === '/') {
    return path;
  }
  //strip Trailing Slash if any
  path = stripTrailingSlash(path);
  var x;
  // Unix-based path
  x = path.lastIndexOf('/');
  if (x === 0) {
    //if index is zero then last path would be /
    return '/';
  } else if (x > 0) {
    return path.substring(0, x);
  }
  // Windows-based path
  x = path.lastIndexOf('\\');
  if (x >= 0) {
    return path.substring(0, x);
  }
  return path; // just return path as is
}
