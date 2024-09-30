import { PrismaClient, Users } from '@prisma/client'
import { UsersCreateDTO } from '../../types/users.dto'

export class UsersRepository {
  private readonly prisma: PrismaClient
  constructor () {
    this.prisma = new PrismaClient()
  }

  async create (data: UsersCreateDTO): Promise<Users> {
    return await this.prisma.users.create({ data })
  }

  async findByEmail (email: string): Promise<Users | null> {
    return await this.prisma.users.findUnique({ where: { email } })
  }

  async findById (userID: string): Promise<Users | null> {
    return await this.prisma.users.findUnique({ where: { userID } })
  }

  async findRoleByID (userID: string) {
    return await this.prisma.users.findUnique({
      where: { userID },

      select: { role: true }
    })
  }

  async updateLastConnection (userID: string): Promise<Users> {
    return await this.prisma.users.update({ where: { userID }, data: { lastConnection: new Date() } })
  }
}
