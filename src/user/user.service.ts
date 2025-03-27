import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable() // Marks the class as avaible for dependency injection
export class UsersService {
  // The constructor receives an instance of PrismaService (dependency injection)
  constructor(private prisma: PrismaService) {}

  // Retrieve a single user by unique ID
  async getUserId(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id }, // Look for a user whose 'id' field matches the given id
    });
  }

  // Retrieve a single user by unique email
  async getUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email }, // Look for a user whose 'email' field matches the given email
    });
  }

  // Retrieve all users
  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany(); // Gets all user records from the database
  }

  // Create a new user
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data, // Data must follow the Prisma.UserCreateInput type (like email, password, etc.)
    });
  }

  // Update an existing user
  async updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: { id }, // Find the user by id
      data, // Update the user with the new data provided
    });
  }

  async deleteUser(id: string): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
