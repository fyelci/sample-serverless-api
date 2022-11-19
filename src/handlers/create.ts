import * as uuid from 'uuid';
import 'source-map-support/register';
import {
  APIGatewayEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda';

import { Question, CreateQuestionRequest } from '../types/question.interface';
import { createQuestion } from '../repositories/question.repository';
import { logger } from '../util/logger';

export const create: APIGatewayProxyHandler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  logger.defaultMeta = { requestId: context.awsRequestId };

  const timestamp = new Date().getTime();
  const data: CreateQuestionRequest = JSON.parse(event.body);
  if (typeof data.text !== 'string') {
    return {
      statusCode: 400,
      body: 'Validation Failed',
    };
  }

  const question: Question = {
    id: uuid.v1(),
    text: data.text,
    answered: false,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  try {
    await createQuestion(question);

    return {
      statusCode: 200,
      body: JSON.stringify(question),
    };
  } catch (err) {
    logger.error('Error while creating todo');
    return {
      statusCode: 500,
      body: 'Internal server error',
    };
  }
};
