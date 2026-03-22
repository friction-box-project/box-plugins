export type SettingValue = string | number | boolean;
export type SettingsRecord = Record<string, SettingValue>;

export type BoxOutcome = 'completed' | 'skipped';
export type BoxResult = { outcome: BoxOutcome };

export interface BoxStateClient {
	get<T>(key: string): Promise<T | null>;
	set<T>(key: string, value: T): Promise<void>;
	delete(key: string): Promise<void>;
	getAll(): Promise<Record<string, unknown>>;
}

export type ResponseSchema = {
	name: string;
	schema: Record<string, unknown>;
};

type GenerateOpts = { maxTokens?: number; timeoutMs?: number };

export interface AiClient {
	generate(system: string, prompt: string, opts?: GenerateOpts): Promise<string | null>;
	generateJson<T>(system: string, prompt: string, schema: ResponseSchema, opts?: GenerateOpts): Promise<T | null>;
}

export interface BoxContext {
	boxId: string;
	entryId: string;
	settings: SettingsRecord;
	state: BoxStateClient;
	fetch: (url: string, init?: RequestInit) => Promise<Response>;
	ai: AiClient;
	complete: (result?: BoxResult) => void;
}
