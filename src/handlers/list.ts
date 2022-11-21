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

  const categoryId =
    (event.queryStringParameters && event.queryStringParameters['categoryId']) || '0';

  const questions = await listQuestions(parseInt(categoryId));

  return {
    statusCode: 200,
    body: JSON.stringify(questions),
  };
};
