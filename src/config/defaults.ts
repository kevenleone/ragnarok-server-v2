import CONSTANTS from '../utils/contants';
import { config } from 'dotenv';
config();

const { RUN_PLAYGROUND, JWT_SECRET, APP_NAME, NODE_ENV, MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS } = process.env;

export default {
  CONSTANTS,
  APP_NAME: APP_NAME || 'Graphscript',
  ENVIRONMENT: NODE_ENV,
  JWT_SECRET: JWT_SECRET || 'MY_SECRET_SECRET',
  RUN_PLAYGROUND: RUN_PLAYGROUND || NODE_ENV !== 'production' ? true : false,
  MONSTER_IMAGE_URL: 'https://raw.githubusercontent.com/kevenleone/ragnarok-server/master/images',
  MAP_URL: 'http://www3.worldrag.com/database/media/maps',
  MAIL_HOST,
  MAIL_PORT,
  MAIL_USER,
  MAIL_PASS,
};
