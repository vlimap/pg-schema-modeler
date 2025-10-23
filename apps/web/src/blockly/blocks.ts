import * as Blockly from 'blockly';
import 'blockly/javascript';
import { defineBlocksWithJsonArray } from 'blockly';

// Define custom Blockly blocks JSON array according to requirements
const blocksJson = [
  {
    "type": "pg_schema",
    "message0": "Schema %1",
    "args0": [
      {
        "type": "field_input",
        "name": "NAME",
        "text": "public"
      }
    ],
    "output": null,
    "colour": 230,
    "tooltip": "Define um schema PostgreSQL",
    "helpUrl": ""
  },
  {
    "type": "pg_enum",
    "message0": "Enum %1 com valores %2",
    "args0": [
      {
        "type": "field_input",
        "name": "NAME",
        "text": "enum_name"
      },
      {
        "type": "field_input",
        "name": "VALUES",
        "text": "valor1, valor2"
      }
    ],
    "colour": 120,
    "tooltip": "Define um tipo enum",
    "helpUrl": ""
  },
  {
    "type": "pg_domain",
    "message0": "Domain %1 baseado em tipo %2",
    "args0": [
      {
        "type": "field_input",
        "name": "NAME",
        "text": "domain_name"
      },
      {
        "type": "field_input",
        "name": "BASED_ON",
        "text": "int4"
      }
    ],
    "colour": 210,
    "tooltip": "Define um domain",
    "helpUrl": ""
  }
  // Completar com demais blocos
];

defineBlocksWithJsonArray(blocksJson);

export {};
