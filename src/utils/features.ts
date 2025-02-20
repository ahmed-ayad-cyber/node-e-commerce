import mongoose from "mongoose";

class Features {
    public  paginationResult:any;

    constructor(public mongooseQuery:mongoose.Query<any[],any>,private queryString:any){}

    filter(){
        const queryStringObj:any = {...this.queryString}
        const excutedString:string[] = ['page', 'limit', 'sort', 'fields', 'search', 'lang']
        excutedString.forEach((field:string):void=>{
            delete queryStringObj[field]})
        let queryString:string = JSON.stringify(queryStringObj)
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`)
        this.mongooseQuery= this.mongooseQuery.find(JSON.parse(queryString))
        return this;
    }

    sort (){
        if(this.queryString.sort){
            const sotrBy:any = this.queryString.sort().split(',').join(' ')
            this.mongooseQuery.sort(sotrBy)
        }else this.mongooseQuery.sort('-updatedAt -createdAt')
        return this;
    }

    limitFields (){
        if (this.queryString.fields){
            const fields = this.queryString.fields.split(',').join(' ')
            this.mongooseQuery.select(fields)
        } else this.mongooseQuery.select(' -__v')
        return this
    }

    search (modelName:string){
        if(this.queryString.search){
            let query;
            if(modelName === 'products'){
                query = {
                    $or:
                    [{name :new RegExp(this.queryString.search, 'i')}
                        ,
                        {description :new RegExp(this.queryString.search, 'i')}
                    ]
                }
            }else {
                query = {name :new RegExp(this.queryString.search, 'i')}
            }
            const mongooseQuery= this.mongooseQuery.find(query)
        }
        return this
    }

    paginatin (documentCount:number){
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 20;
        const skip = (page - 1) * limit;
        const endIndex = page * limit;
        const pagination: any = {};
        pagination.currentPage = page;
        pagination.limit = limit;
        pagination.totalPages = Math.ceil(documentCount / limit);
        if (endIndex < documentCount) pagination.next = page + 1;
        if (skip > 0) pagination.prev = page - 1;
        this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
        this.paginationResult = pagination;
        return this
    }
}

export default Features