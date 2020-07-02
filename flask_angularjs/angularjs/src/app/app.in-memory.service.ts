import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const msgs = [{
      "req_msg": "chatbot azure version",
      "res_msg": "A managed service purpose-built for bot developmentDevelop intelligent"
    }, {
      "req_msg": "chatbot azure",
      "res_msg": "A managed service purpose-built for bot developmentDevelop intelligent"
    }, {
      "req_msg": "chatbot azure",
      "res_msg": "A managed service purpose-built for bot developmentDevelop intelligent"
    }, {
      "req_msg": "chatbot azure",
      "res_msg": "A managed service purpose-built for bot developmentDevelop intelligent"
    }]
    return { msgs };
  }
}
