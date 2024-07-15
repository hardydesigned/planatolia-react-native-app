import DataObject from "./DataObject";

export interface User {
	firstName?: string;
	theme?: string;
	apiKey?: string;
	url?: string;
	projects?: DataObject[];
	statuses?: DataObject[];
	types?: DataObject[];
	projectDefault?: DataObject;
	typeDefault?: DataObject;
	statusDefault?: DataObject;
}
