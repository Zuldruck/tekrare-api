import { mutationField, nonNull, stringArg } from 'nexus';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import { Context } from '../../context';

const md5 = (contents: string) => crypto.createHash('md5').update(contents).digest('hex');

export const register = mutationField('register', {
  type: 'User',
  args: {
    email: nonNull(stringArg()),
    pseudo: nonNull(stringArg()),
    password: nonNull(stringArg()),
  },
  resolve: async (_, { email, pseudo, password }, ctx: Context) => {
    const emailExists = await ctx.prisma.user.findUnique({ where: { email } });
    const pseudoExists = await ctx.prisma.user.findUnique({ where: { pseudo } });
    
    if (emailExists)
      throw new Error(`User with email ${email} already exists`);
    if (pseudoExists)
      throw new Error(`User with pseudo ${pseudo} already exists`);
    const newUser = await ctx.prisma.user.create({
      data: {
        email,
        pseudo,
        password: md5(password),
      },
    });
    return newUser;
  },
});

export const login = mutationField('login', {
  type: 'Connection',
  args: {
    email: stringArg(),
    pseudo: stringArg(),
    password: nonNull(stringArg()),
  },
  resolve: async (_, { email, pseudo, password }, ctx: Context) => {
    if (!email && !pseudo)
      throw new Error('Either email or pseudo is needed');

    const options = email ? { email } : { pseudo };
    const user = await ctx.prisma.user.findFirst({
      where: {
        ...options,
        password: md5(password),
      }
    });
    if (!user)
      throw new Error('Wrong credentials');
    return {
      token: jwt.sign(
        { id: user.id, email, pseudo },
        process.env.JWT_SECRET,
        { expiresIn: 60 * 60 * 24 } // Expires in 24 Hours
      ),
    };
  },
});
