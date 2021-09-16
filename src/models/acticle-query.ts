// This model would be for holding a query with a defined type to determine which endpoint should be hit. (category or search)

export class ArticleQuery {

    queryType: string;
    query: string;

    constructor(queryType: string, query: string) {
        this.queryType = queryType;
        this.query = query;
    }
}