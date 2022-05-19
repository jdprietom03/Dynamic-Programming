import { AuthenticationError, UserInputError } from 'apollo-server-micro';
import { createUser, findUser, validatePassword } from '../lib/user';
import { setLoginSession, getLoginSession } from '../lib/auth';
import { removeTokenCookie } from '../lib/auth-cookies';

export const resolvers = {
    Query: {

        async viewer(_parent:any , _args:any, context:any, _info:any) {
            try {
                const session = await getLoginSession(context.req);
                if (session) {
                    return findUser({ username: session.user_name });
                }
            } catch (error) {
                throw new AuthenticationError(
                    'Authentication token is invalid, please log in',
                );
            }
        },
        
    },
    Mutation: {
        async signUp(_parent:any, args:any, _context:any, _info:any) {
            const user = await createUser(args.input);
            return { user };
        },
        async signIn(_parent:any, args:any, context:any, _info:any) {
            const user = await findUser({ username: args.input.username });
            
            if (user && (await validatePassword(user, args.input.password))) {
                const session = {
                    //id: user.id,
                    user_name: user.user_name,
                    //typeUser: user.typeUser,
                    name: user.name,
                    last_name: user.last_name,
                    email: user.email,
                };
                await setLoginSession(context.res, session);
                return { user };
            }

            throw new UserInputError('Invalid email and password combination');
        },
        async signOut(_parent:any, args:any, context:any, _info:any) {
            removeTokenCookie(context.res);
            return true;
        },
    },
};