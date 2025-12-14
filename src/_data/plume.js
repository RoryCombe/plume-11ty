import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read plume.json from the root directory
const plumeConfigPath = path.join(__dirname, '../../plume.json');

export default function () {
  try {
    const configContent = fs.readFileSync(plumeConfigPath, 'utf-8');
    return JSON.parse(configContent);
  } catch (error) {
    console.warn('Could not load plume.json:', error.message);
    return {};
  }
}
