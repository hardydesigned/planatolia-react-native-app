import OpenProjectDataObject from "./OpenProjectDataObject";

export interface OpenProjectData {
	apiKey: string;
	url: string;
	projects: OpenProjectDataObject[];
	statuses: OpenProjectDataObject[];
	types: OpenProjectDataObject[];
	projectDefault: OpenProjectDataObject;
	typeDefault: OpenProjectDataObject;
	statusDefault: OpenProjectDataObject;
}
