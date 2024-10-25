import { Contact, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { prismaClient } from '../src/application/database';

export class UserTes {
  static async delete() {
    await prismaClient.user.deleteMany({
      where: {
        username: 'test',
      },
    });
  }

  static async create() {
    await prismaClient.user.create({
      data: {
        username: 'test',
        name: 'test',
        password: await bcrypt.hash('test', 10),
        token: 'test',
      },
    });
  }

  static async get(): Promise<User> {
    const user = await prismaClient.user.findFirst({
      where: {
        username: 'test',
      },
    });

    if (!user) {
      throw new Error('User is not found');
    }

    return user;
  }
}

export class ContactTes {
  static async deleteAll() {
    const contact = await prismaClient.contact.deleteMany({
      where: {
        username: 'test',
      },
    });
  }

  static async create() {
    const contact = await prismaClient.contact.create({
      data: {
        first_name: 'test',
        last_name: 'tets',
        email: 'test@mail.com',
        phone: '02222',
        username: 'test',
      },
    });
  }

  static async get(): Promise<Contact> {
    const contact = await prismaClient.contact.findFirst({
      where: {
        username: 'test',
      },
    });

    if (!contact) {
      throw new Error('Contact is not found');
    }
    return contact;
  }
}
