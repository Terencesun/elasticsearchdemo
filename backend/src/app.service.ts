import {Injectable} from '@nestjs/common';
import * as elasticsearch from '@elastic/elasticsearch';

@Injectable()
export class AppService {

    private esClient: any;

    constructor() {
        this.esClient = new elasticsearch.Client({
            node: 'http://192.168.218.47:9200',
            maxRetries: 5,
            requestTimeout: 60000
        });
    }

    async search(KEY) {
        const code = {
            OK: 10,
        };
        const res1 = await this.esClient.search({
            body: {
                "query": {
                    "multi_match": {
                        "query": KEY,
                        "type": "best_fields",
                        "fields": ["sign"],
                        "tie_breaker": 0.8,
                    }
                },
                size: 10,
            },
        });
        const res2 = await this.esClient.search({
            body: {
                "query": {
                    "multi_match": {
                        "query": KEY,
                        "type": "best_fields",
                        "fields": ["content"],
                        "tie_breaker": 0.8,
                    }
                },
                size: 10,
            },
        });
        // console.log(res1.body.hits)
        const bilibili_sign = [];
        for (let item of res1.body.hits.hits) {
            bilibili_sign.push({
                mongoid: item._id,
                mid: item._source.mid,
                name: item._source.name,
                sign: item._source.sign,
            });
        }
        const elastic_news = [];
        for (let item of res2.body.hits.hits) {
            elastic_news.push({
                mongoid: item._source.mongoid,
                title: item._source.title,
                content: item._source.content,
                createdTime: item._source.createdTime,
            });
        }
        return {
            code: code.OK,
            msg: {
                bilibili_sign,
                elastic_news
            }
        }
    }
}
