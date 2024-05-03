import { Schema } from "mongoose";

export class QueryBuilder {
    /** @param {Schema} schema  */
    static build(schema, searchTerm) {
        let searchQuery = []
        Object.keys(schema.paths).forEach((path) => {
            if (schema.path(path) instanceof Schema.Types.String && !(schema.path(path) instanceof Schema.Types.ObjectId)) {
                searchQuery.push(JSON.parse(`{ "${path}": { "$regex": "${searchTerm.query}", "$options": "i" } }`))
            }
        })
        return { $or: searchQuery }
    }
}