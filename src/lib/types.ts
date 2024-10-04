export type Resource = {
	name: string;
	url: string;
	description: string;
	details?: ResourceDetails;
};

export type ResourceDetails = {
	attributes: string[];
	description: string;
	display_name: string;
	fields: { [key: string]: Field };
	metrics: string[];
	name: string;
	segments: string[];
};

type Field = {
	field_details: FieldDetails;
	incompatible_fields: string[];
};

type FieldDetails = {
	attribute_resources?: unknown[];
	category?: Category;
	data_type?: DataType;
	description?: string;
	enum_values?: string[];
	filterable?: boolean;
	is_repeated?: boolean;
	metrics?: unknown[];
	name?: string;
	segments?: unknown[];
	selectable?: boolean;
	selectable_with?: string[];
	sortable?: boolean;
	type_url?: string;
};

type Category = 'ATTRIBUTE' | 'METRIC' | 'SEGMENT';

type DataType =
	| 'INT64'
	| 'DOUBLE'
	| 'STRING'
	| 'RESOURCE_NAME'
	| 'ENUM'
	| 'BOOLEAN'
	| 'MESSAGE'
	| 'DATE'
	| 'INT32';
