import { Context } from "../utils";
import * as yup from 'yup';
import { generateAuthToken } from "../auth";
import {hash, compareSync} from 'bcryptjs';
import { RegisterInput } from "../graphql";
import { NexusGenInputs } from "../generated/nexus";


export async function registerUser(ctx: Context, data: NexusGenInputs["RegisterInput"]) {

    if(!yup.string().email().validateSync(data.email)) {
        throw new Error("E-Mail is not valid");
      }

    const user = await ctx.photon.users.create({
        data: {
            ...data,
            password: await hash(data.password, 10),
        }
    })

    return {
        token: generateAuthToken(user),
        user
    }
}

export async function loginUser(ctx: Context, data: {email: string, password: string}) {

    const user = await ctx.photon.users.findOne({ where: { email: data.email } })

    if (!user || !compareSync(data.password, user.password)) {
        throw new Error('Password or user is wrong');
    }

    return {
        token: generateAuthToken(user),
        user,
    }
}

export async function findUser(ctx: Context) {
    const user = await ctx.photon.users.findOne({
        where: {
          id: ctx.userId
        }
      });

      if(!user) {
        throw new Error("unexpected error");
      }

      return user;
}

