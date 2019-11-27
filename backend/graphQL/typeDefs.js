import * as path from "path";
import {fileLoader, mergeTypes} from "merge-graphql-schemas";

const typesArray = fileLoader(path.join(__dirname, "./model/**/*.graphql"), {recursive: true});
const typesMerged = mergeTypes(typesArray, {all: true});

export default typesMerged;
