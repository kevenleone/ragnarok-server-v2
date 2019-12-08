import nodemailer from 'nodemailer';
import gql from 'graphql-tag';
import Logger from './logger';
import Defaults from '../config/defaults';
import { Pagination } from '../interfaces/Pagination';
import { Monster } from '../entity/Monster';

const statuses = ['HP', 'SP', 'EXP', 'JEXP', 'ATK1', 'ATK2', 'DEF', 'MDEF', 'STR', 'AGI', 'VIT', 'INT', 'DEX', 'LUK'];

export const logger = Logger;
export const defaults = Defaults;

export const races: any = {
  0: { race: 'Amorfo', background: '#ABB' },
  1: { race: 'Morto-Vivo', background: '#7159C1' },
  2: { race: 'Bruto', background: '#FAB' },
  3: { race: 'Planta', background: '#9A9A' },
  4: { race: 'Inseto', background: '#44AE12' },
  5: { race: 'Peixe', background: '#008080' },
  6: { race: 'Demônio', background: '#D7BDE2' },
  7: { race: 'Anjo', background: '#AEB6BF' },
  8: { race: 'Dragão', background: '#5D6D7E' },
  9: { race: 'Humanóide', background: '#F6DDCC' },
};

export function sendError(message: string, shouldReturn = false): Error {
  logger.error(message);
  const Err: Error = new Error(message);
  if (!shouldReturn) {
    throw Err;
  }
  return Err;
}

export function HttpError(message: string): Error {
  return sendError(message, true);
}

export async function MailerConf() {
  const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS, ENVIRONMENT } = defaults;
  const config = {
    host: MAIL_HOST,
    port: MAIL_PORT,
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASS,
    },
  };
  if (ENVIRONMENT !== 'production') {
    const { user, pass } = await nodemailer.createTestAccount();
    config.auth.user = user;
    config.auth.pass = pass;
  }

  return config;
}

export function getGraphqlOperation(graphqlQuery: any) {
  try {
    const GQL = gql`
      ${graphqlQuery}
    `;
    const operations = GQL.definitions.map(
      (query: any) =>
        `${query.operation} ${query.name ? query.name.value : query.selectionSet.selections[0].name.value}`
    );
    return `[${operations.join(', ')}]`;
  } catch (e) {
    logger.error(`Error in getGraphqlOperation, reason: ${e.message}`);
    return 'Unknown';
  }
}

export function normalizePagination(pagination: Pagination, defaultSize = 50): Pagination {
  const pageSize = pagination.pageSize || defaultSize;
  const pageIndex = pagination.pageIndex || 1;
  const take = pageSize;
  let skip = 0;

  if (pageIndex > 1) {
    skip = take * (pageIndex - 1);
  }

  return {
    pageSize,
    pageIndex,
    take,
    skip,
  };
}

export function getMonsterRace(race: number) {
  return races[race] || { race: 'Unknown Race', background: '#ABB' };
}

export function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function convertTimeSpawn(millisec: number): string {
  const seconds = Number((millisec / 1000).toFixed(1));
  const minutes = Number((millisec / (1000 * 60)).toFixed(1));
  const hours = Number((millisec / (1000 * 60 * 60)).toFixed(1));
  const days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1);

  if (seconds < 60) {
    if (seconds === 0.0) {
      return 'Instantâneo';
    } else {
      return seconds + ' Sec';
    }
  } else if (minutes < 60) {
    return minutes + ' Min';
  } else if (hours < 24) {
    return hours + ' Hrs';
  } else {
    return days + ' Days';
  }
}

export function statusReferences(LV: number): Array<Promise<Monster>> {
  const promises = [];
  for (const status of statuses) {
    const promise = Monster.createQueryBuilder('monster')
      .select(`MAX(monster.${status})`, status)
      .where({ LV })
      .getRawOne();
    promises.push(promise);
  }
  return promises;
}
