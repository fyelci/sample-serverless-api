import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  GetCommandInput,
  PutCommand,
  PutCommandInput,
  ScanCommand,
  ScanCommandInput,
  UpdateCommand,
  UpdateCommandInput,
} from '@aws-sdk/lib-dynamodb';

import { Question, UpdateQuestionRequest } from '../types/question.interface';
import { getConfig } from '../util/config';
import { logger } from '../util/logger';

const { questionsTable } = getConfig();

const dynamoDb = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(dynamoDb);

export async function createQuestion(question: Question): Promise<void> {
  const params: PutCommandInput = {
    TableName: questionsTable,
    Item: question,
  };

  await ddbDocClient.send(new PutCommand(params));
}

export async function updateQuestion(id: string, data: UpdateQuestionRequest): Promise<void> {
  const timestamp = new Date().getTime();
  const params: UpdateCommandInput = {
    TableName: questionsTable,
    Key: { id },
    ExpressionAttributeNames: {
      '#question_text': 'text',
    },
    ExpressionAttributeValues: {
      ':text': data.text,
      ':answers': data.answers,
      ':explanation': data.explanation,
      ':updatedAt': timestamp,
    },
    UpdateExpression:
      'SET #question_text = :text, answers = :answers, explanation = :explanation, updatedAt = :updatedAt',
    ReturnValues: 'ALL_NEW',
  };

  const result = await ddbDocClient.send(new UpdateCommand(params));
  logger.info('Update result', result);
}

export async function setImagePath(id: string, image: string): Promise<void> {
  const timestamp = new Date().getTime();
  const params: UpdateCommandInput = {
    TableName: questionsTable,
    Key: { id },
    ExpressionAttributeValues: {
      ':image': image,
      ':updatedAt': timestamp,
    },
    UpdateExpression: 'SET image = :image, updatedAt = :updatedAt',
    ReturnValues: 'ALL_NEW',
  };

  const result = await ddbDocClient.send(new UpdateCommand(params));
  logger.info('Update result', result);
}

export async function listQuestions(): Promise<Question[]> {
  const params: ScanCommandInput = {
    TableName: process.env.DYNAMODB_QUESTIONS_TABLE,
  };
  const result = await ddbDocClient.send(new ScanCommand(params));
  return result.Items as Question[];
}

export async function getQuestion(id: string): Promise<Question | undefined> {
  const params: GetCommandInput = {
    TableName: process.env.DYNAMODB_QUESTIONS_TABLE,
    Key: { id },
  };
  const result = await ddbDocClient.send(new GetCommand(params));
  return result.Item as Question;
}
