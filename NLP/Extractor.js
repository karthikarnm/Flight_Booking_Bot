
const extractAllEntities = async (entities) => {
    let date, source, des, type, via;

    for (const entity of entities) {
        switch (entity.category) {
            case "date":{
                    date = entity.text
                }
                break;
                case "source ":
                    source = entity.text;
                break;
                case "destination":
                    des = entity.text;
                break;
                case  'ClassType':
                type = entity.text;
                break;
                case  "via" :
                    via = entity.text;
                    break;

            default:
                break;
        }
    }

    return {date, source, des, type, via };
};

module.exports.extractAllEntities = extractAllEntities;