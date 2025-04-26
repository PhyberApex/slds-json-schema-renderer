/* eslint-disable antfu/no-top-level-await */
import fs from 'fs-extra'
import * as schemaParser from './src/utils/schema-parser.js'

await fs.ensureDir('dist')
const mockData = {
  title: 'JSON Schema Documentation (Dev)',
  description: 'Development mode with Vite',
  schemas: await (async () => {
    return schemaParser.parseDirectory('test', { verbose: true })
  })(),
}

const exportCode = `export default ${JSON.stringify(mockData, null, 2)};`
await fs.writeFile('dist/mockData.js', exportCode, 'utf8')
console.log('Schemas exported to schemas.js')
