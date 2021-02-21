"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const createJsonb_1 = require("../modules/jsonb/createJsonb");
const delJson_1 = require("../modules/jsonb/delJson");
const findJsonById_1 = require("../modules/jsonb/findJsonById");
const getJsonb_1 = require("../modules/jsonb/getJsonb");
const updateJson_1 = require("../modules/jsonb/updateJson");
const CreateProd_1 = require("../modules/products/CreateProd");
const DelProdById_1 = require("../modules/products/DelProdById");
const FindProdById_1 = require("../modules/products/FindProdById");
const FindProdsByName_1 = require("../modules/products/FindProdsByName");
const GetProds_1 = require("../modules/products/GetProds");
const UpdateProd_1 = require("../modules/products/UpdateProd");
const ChangePassword_1 = require("../modules/user/ChangePassword");
const ConfUser_1 = require("../modules/user/ConfUser");
const ForgotPassword_1 = require("../modules/user/ForgotPassword");
const Login_1 = require("../modules/user/Login");
const Logout_1 = require("../modules/user/Logout");
const Me_1 = require("../modules/user/Me");
const Register_1 = require("../modules/user/Register");
exports.default = type_graphql_1.buildSchema({
    resolvers: [
        createJsonb_1.CreateJsonResolver,
        delJson_1.DeleteJsonResolver,
        findJsonById_1.FindJsonByIdResolver,
        getJsonb_1.GetJSONResolver,
        updateJson_1.UpdateJsonResolver,
        CreateProd_1.CreateProdResolver,
        DelProdById_1.DeleteProdResolver,
        FindProdById_1.FindProdByIdResolver,
        FindProdsByName_1.FindProdsByNameResolver,
        GetProds_1.GetProdsResolver,
        UpdateProd_1.UpdateProdResolver,
        ChangePassword_1.ChangePasswordResolver,
        ConfUser_1.ConfUserResolver,
        ForgotPassword_1.ForgotPasswordResolver,
        Login_1.LoginResolver,
        Logout_1.LogoutResolver,
        Me_1.MeResolver,
        Register_1.RegisterResolver,
    ],
});
