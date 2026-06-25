export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

export interface Settings {
  provider: 'qwen' | 'qoder';
  qwenApiKey: string;
  qoderEndpoint: string;
  qoderApiKey: string;
  model: string;
  region: string;
}

export type Model = 'qwen-plus' | 'qwen-max' | 'qwen3.5-flash' | 'qwen3.5-plus' | 'qwen3-max';

export type Region = 'singapore' | 'us' | 'china';

export const MODELS: { value: Model; label: string }[] = [
  { value: 'qwen-plus', label: 'Qwen Plus' },
  { value: 'qwen-max', label: 'Qwen Max' },
  { value: 'qwen3.5-flash', label: 'Qwen 3.5 Flash' },
  { value: 'qwen3.5-plus', label: 'Qwen 3.5 Plus' },
  { value: 'qwen3-max', label: 'Qwen 3 Max' },
];

export const REGIONS: { value: Region; label: string; baseUrl: string }[] = [
  { value: 'singapore', label: 'Singapore (International)', baseUrl: 'https://dashscope-intl.aliyuncs.com/compatible-mode/v1' },
  { value: 'us', label: 'US (Virginia)', baseUrl: 'https://dashscope-us.aliyuncs.com/compatible-mode/v1' },
  { value: 'china', label: 'China (Beijing)', baseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1' },
];

export const DEFAULT_SETTINGS: Settings = {
  provider: 'qwen',
  qwenApiKey: '',
  qoderEndpoint: '',
  qoderApiKey: '',
  model: 'qwen-plus',
  region: 'singapore',
};
