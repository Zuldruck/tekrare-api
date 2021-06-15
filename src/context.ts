import { PrismaClient } from '@prisma/client';
import { PubSub } from 'apollo-server';

export interface Context {
  headers: Record<string, string>
  prisma: PrismaClient
  pubsub: PubSub
};

const prisma = new PrismaClient();
const pubsub = new PubSub();

export const context = ({ req, _ }: any) => ({
  headers: req.headers,
  prisma: prisma,
  pubsub: pubsub,
});
