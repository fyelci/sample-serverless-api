import {
  APIGatewayEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda';
import 'source-map-support/register';

import { listQuestions } from '../repositories/question.repository';
import { logger } from '../util/logger';

export const list: APIGatewayProxyHandler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  logger.defaultMeta = { requestId: context.awsRequestId };

  const questions = await listQuestions();

  return {
    statusCode: 200,
    body: JSON.stringify(questions),
  };
};
