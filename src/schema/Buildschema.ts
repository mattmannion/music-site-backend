import { buildSchema } from 'type-graphql';

// jsonb resolvers
import { CreateJsonResolver } from '../modules/jsonb/createJsonb';
import { DeleteJsonResolver } from '../modules/jsonb/delJson';
import { FindJsonByIdResolver } from '../modules/jsonb/findJsonById';
import { GetJSONResolver } from '../modules/jsonb/getJsonb';
import { UpdateJsonResolver } from '../modules/jsonb/updateJson';

// prod resolvers
import { CreateProdResolver } from '../modules/products/CreateProd';
import { DeleteProdResolver } from '../modules/products/DelProdById';
import { FindProdByIdResolver } from '../modules/products/FindProdById';
import { FindProdsByNameResolver } from '../modules/products/FindProdsByName';
import { GetProdsResolver } from '../modules/products/GetProds';
import { UpdateProdResolver } from '../modules/products/UpdateProd';

// user resolvers
import { ChangePasswordResolver } from '../modules/user/ChangePassword';
import { ConfUserResolver } from '../modules/user/ConfUser';
import { ForgotPasswordResolver } from '../modules/user/ForgotPassword';
import { LoginResolver } from '../modules/user/Login';
import { LogoutResolver } from '../modules/user/Logout';
import { MeResolver } from '../modules/user/Me';
import { RegisterResolver } from '../modules/user/Register';

export default buildSchema({
  resolvers: [
    // json resolvers
    CreateJsonResolver,
    DeleteJsonResolver,
    FindJsonByIdResolver,
    GetJSONResolver,
    UpdateJsonResolver,

    // prod resolvers
    CreateProdResolver,
    DeleteProdResolver,
    FindProdByIdResolver,
    FindProdsByNameResolver,
    GetProdsResolver,
    UpdateProdResolver,

    // users resolvers
    ChangePasswordResolver,
    ConfUserResolver,
    ForgotPasswordResolver,
    LoginResolver,
    LogoutResolver,
    MeResolver,
    RegisterResolver,
  ],
});
