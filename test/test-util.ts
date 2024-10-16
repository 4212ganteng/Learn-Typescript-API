import { prismaClient } from '../src/application/database';

export class UserTes {
  static async delete() {
    await prismaClient.user.deleteMany({
      where: {
        username: 'test',
      },
    });
  }
}
