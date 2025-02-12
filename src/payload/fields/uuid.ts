import { Field } from 'payload'
import { v4 as uuidv4 } from 'uuid'

const uuidField: Field = {
  name: 'id',
  type: 'text',
  defaultValue: () => uuidv4(),
  admin: { hidden: true, readOnly: true },
}

export default uuidField
