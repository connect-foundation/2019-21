import * as path from "path";
import {fileLoader} from "merge-graphql-schemas";

/* MANUAL APPROACH: Update this file manually with each resolver file */
// import userResolvers from "./user.resolvers";
// import welcomeResolvers from "./welcome.resolvers";
// const resolversArray = [userResolvers, welcomeResolvers];

/*  AUTOMATED APPROACH: Put your resolvers anywhere
    with ".[js/ts]" naming convention */
const resolvers = fileLoader(path.join(__dirname, "./model/**/*.resolver.js"));

// console.log(resolvers);

export default resolvers;
