import { Schema } from "mongoose";

export class QueryBuilder {
    /** @param {Schema} schema  */
    static build(schema, searchTerm) {
        let searchQuery = {}
        Object.keys(schema.paths).forEach((path) => {
            let regex = new RegExp(searchTerm.query, "i")
            searchQuery[path] = { $regex: regex }
        })
        return { $or: [searchQuery] }
    }
}