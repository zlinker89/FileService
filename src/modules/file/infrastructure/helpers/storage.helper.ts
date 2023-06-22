const fs = require('fs');
import { join } from 'path';

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
  let newDirectory = directory;
  const paths = splitTrailingSlash(pathOriginal);
  for (const path of paths) {
    newDirectory = join(newDirectory, path);
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
  try {
    return fs.existsSync(path);
  } catch (error) {
    // TODO: log de errores
    console.error(error);
    throw error;
  }
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
  const readFile = fs.readFileSync;
  try {
    return encoding ? readFile(path, encoding) : readFile(path, {});
  } catch (error) {
    // TODO: log de errores
    console.error(error);
    throw error;
  }
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
  try {
    if (!checkIfFileOrDirectoryExists(path)) {
      fs.mkdirSync(path);
    }
  
    return await fs.writeFileSync(`${path}/${fileName}`, data, 'utf8');
  } catch (error) {
    // TODO: log de errores
    console.error(error);
    throw error;
  }
};

/**
 * Delete file at the given path via a promise interface
 *
 * @param {string} path
 *
 * @returns {Promise<void>}
 */
export const deleteFile = async (path: string): Promise<void> => {
  try {
    return await fs.unlinkSync(path);
  } catch (error) {
    // TODO: log de errores
    console.error(error);
    throw error;
  }
};

/**
 * Check directory if empty
 *
 * @param {string} directory
 *
 * @returns {Promise<void>}
 */
export const checkIfDirectoryEmpty = async (path: string): Promise<void> => {
  let flag = false;
  const newPath = goUp(path);
  if (newPath.endsWith('public')) flag = true;
  try {
    const files = countFiles(newPath);
    console.log(newPath, files);
    if (!files && !flag) {
      await deleteDirectory(newPath);
      await checkIfDirectoryEmpty(newPath);
    }
  } catch (error) {
    // TODO: log de errores
    console.error(error);
    throw error;
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
  const isDirectory = await fs.lstatSync(path).isDirectory();
  if (!isDirectory) return;
  return await fs.rmSync(path, { recursive: true, force: true });
};

const stripTrailingSlash = function (str) {
  return str.replace(/[\\/]+$/g, '');
};

const splitTrailingSlash = function (str) {
  return str.replace(/\\/g, '/').split('/');
};

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
};

/**
 * Count files in folder
 * @param dir
 * @returns
 */
const countFiles = (dir: string): number =>
  fs.readdirSync(dir).reduce((acc: number, file: string) => {
    const fileDir = `${dir}/${file}`;

    if (fs.lstatSync(fileDir).isDirectory()) {
      return (acc += countFiles(fileDir));
    }

    if (fs.lstatSync(fileDir).isFile()) {
      return ++acc;
    }

    return acc;
  }, 0);
