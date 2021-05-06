
import JsonParser from './JsonParser'

export default class JsonFormat {

    parse(input) {
        return JsonParser.runParser(input, null);
    }
}
