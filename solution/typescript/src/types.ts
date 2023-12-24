// MACROS

export const MAX_RETRY = 3;

export const MAX_TIMEOUT = 10000;

export const RESULT_KEY = 'result';

export const MAX_LIMIT = 10;

// ENUMERATORS

export enum WindDirectionEnum {
  N = 'N',
  NE = 'NE',
  E = 'E',
  SE = 'SE',
  S = 'S',
  SW = 'SW',
  W = 'W',
  NW = 'NW',
}

export enum APINameEnum {
  WIND_FLOW = 'WindFlow',
  BARO_TREND = 'BaroTrend',
  WEATHER_STAT = 'WeatherStat',
  RAIN_CHECK = 'RainCheck',
}

export enum PromiseStatusEnum {
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected',
}

// TYPES

export type WindData = {
  windSpeed: number;
  windDirection: WindDirectionEnum;
};

export type AtmosphereData = {
  pressure: number;
};

export type TemperatureData = {
  temperature: 22;
  humidity: 60;
};

export type PrecipitationData = {
  precipitation: number;
};

export type WeatherData = WindData | AtmosphereData | TemperatureData | PrecipitationData;

export type APIResponse = {
  apiName: APINameEnum;
  data: WeatherData
};

export type CacheItem = {
  value: any;
  expiresAt: number;
}
