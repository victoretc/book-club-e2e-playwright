import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { generate } from "json-schema-faker";

const __dirname = dirname(fileURLToPath(import.meta.url));
const schemaPath = join(__dirname, "..", "src", "openapi-schema.json");
const outputPath = join(__dirname, "..", "src", "api", "fixtures.ts");

const schema = JSON.parse(readFileSync(schemaPath, "utf-8"));
const schemas = schema.components?.schemas || {};

function createRefResolver(allSchemas) {
	return (ref) => {
		const match = ref.match(/^#\/components\/schemas\/(.+)$/);
		if (match) {
			const name = match[1];
			if (allSchemas[name]) return allSchemas[name];
		}
		return null;
	};
}

const fixtures = {};
const refResolver = createRefResolver(schemas);

for (const [name, jsonSchema] of Object.entries(schemas)) {
	fixtures[name] = await generate(jsonSchema, {
		useExamplesValue: true,
		alwaysFakeOptionals: true,
		refDepthMax: 3,
		seed: 42,
		failOnInvalidTypes: false,
		defaultInvalidTypeProduct: null,
		refResolver,
		maxItems: 1
	});
}

const content =
	`// Auto-generated — do not edit manually\n` +
	`// Run: npm run generate:api\n` +
	`export const fixtures = ${JSON.stringify(fixtures, null, 2)} as const;\n`;

writeFileSync(outputPath, content);
console.log(`✔ fixtures.ts created (${Object.keys(fixtures).length} schemas)`);
