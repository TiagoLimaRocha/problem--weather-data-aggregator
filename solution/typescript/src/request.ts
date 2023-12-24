import * as BaroTrend from './mock/atmosphere.mock.json';
import * as WindFlow from './mock/wind.mock.json';
import * as WeatherStat from './mock/temperature.mock.json';
import * as RainCheck from './mock/precipitation.mock.json';

import { APIResponse, APINameEnum, WeatherData, MAX_RETRY } from './types';
import { NotFoundError } from './error/NotFound.error';

const dataMap = {
  [APINameEnum.BARO_TREND]: BaroTrend,
  [APINameEnum.WIND_FLOW]: WindFlow,
  [APINameEnum.WEATHER_STAT]: WeatherStat,
  [APINameEnum.RAIN_CHECK]: RainCheck,
}

export async function get(endpoint: APINameEnum, retry = MAX_RETRY): Promise<APIResponse> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      while (retry > 0) {
        const isValidEndpoint = Object.values(APINameEnum).includes(endpoint);
        if (isValidEndpoint) {
          const response = dataMap[endpoint] as APIResponse;

          resolve(response);
          break;
        }

        reject(new NotFoundError('Request not found'));
        retry--;
      }
    }, Math.random() * 10000)
  })
}