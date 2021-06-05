import RJsonLexer from '../../src/parser/RJsonLexer.js';
import StringReader from '../../src/io/StringReader.js';
import CharStream from '../../src/io/CharStream.js';

var logger = require('../../src/logger/logger');

var instance = null;

beforeEach(() => {

});

test('testLargeJson()', () => {
    var properties = "{\"productId\" : \"0ENJMZAXX2\", \"Title\" : \"APACS™ Finapi 262 Unstrung Badminton Racquet\", \"brandName\" : \"Apacs\",\"manufacturer\" : \"APACS AMG Sports WVN Mano 2nd Floor No 62138 Santhome Road Chennai 600004 Contact 8939742090 amgsports2006gmailcom\",\"countryOfOrigin\" : \"Thailand\",\"listingStatus\" : \"Active\",\"productCategory\" : \"/Sports & Fitness/Badminton/Yonex/Racquet\",\"productTaxCode\" : 12,\"salePrice\" : 1699,\"stock\" : 0,\"SEO\" : null,\"maxOrderQuantity\" : 1,\"hsncode\" : 9506,\"mrp\" : 4299,\"isHazard\" : true,\"searchTerms\" : \"APACS Finapi 262 Unstrung Badminton Racquet,apacs badminton racquet,finapi 262\",\"numOfImages\" : \"5\",\"productDescription\" : \"The use of isometric head frame equalizes the strings in the string bed to deliver perfect shots Aero wide body head helps in faster swing and great feel while smashing The frame and the shaft is made using hi modulus graphite material which offers good strength to the racquet The grip size is g2 which will help in great control The medium stiff flex helps in the delivering powerful shots with brilliant control at the same time The string tension is about 38 lbs with g2 grip size which offers even balance while delivering the shots The length and light weight of these racquets are ideal for perfect swings in all directions\", ";
    var marketplace = ",\"marketplace\" : {\"amazon\" : \"B08HKCCWPD\",\"amazonPrice\" : 1799,\"flipkart\" : \"itme?pid=Naaaaaa\",\"flipkartPrice\" : 1700}";
    var reviews = "[{\"ratings\" : \"5\",\"heading\" : \"Awesome Product\",\"comment\" : \"Excelleent racket\",\"date\" : \"19/03/2021\"},{\"ratings\" : \"4\",\"heading\" : \"...Best racquet in the world\",\"comment\" : \"light weight racket good handling Grip size is good for average hands you don't mind price this price is good for this racket\",\"date\" : \"19/03/2021\"},{\"ratings\" : \"3\",\"heading\" : \"Will buy again...\",\"comment\" : \"Good Buy will buy again\",\"date\" : \"10/01/2021\"}]";
    var ratings = ",\"ratings\": {\"fivestar\" : \"10\",\"fourstar\" : \"5\",\"threestar\" : \"5\",\"twostar\" :\"0\",\"onestar\" : \"0\"," + reviews + "}";
    var keyFeatures = "\"keyFeatures\":[\"Material: High Modulus Graphite\",\"Weight : 85-87g (4U) || Balance : 285 || Flex : 8.5 || Max Tension : 38 LBS\",\"The use of isometric head frame equalizes the strings in the string bed to deliver perfect shots\",\"Power Frame Series\",\"In-Box Contents: 1 Piece Badminton Racket\"]";
    var jsonStr = properties + keyFeatures + ratings + marketplace + "}";
    logger.debug(jsonStr);
    var reader = new StringReader(jsonStr);
    instance = new RJsonLexer(new CharStream(reader));
    var token = instance.getNextToken();
    expect(token.image).toBe("{");

    token = instance.getNextToken();
    expect(token.image).toBe("productId");
    token = instance.getNextToken();
    expect(token.image).toBe(":");
    token = instance.getNextToken();
    expect(token.image).toBe("0ENJMZAXX2");
    token = instance.getNextToken();
    expect(token.image).toBe(",");

    token = instance.getNextToken();
    expect(token.image).toBe("Title");
    token = instance.getNextToken();
    expect(token.image).toBe(":");
    token = instance.getNextToken();
    expect(token.image).toBe("APACS™ Finapi 262 Unstrung Badminton Racquet");
    token = instance.getNextToken();
    expect(token.image).toBe(",");

    token = instance.getNextToken();
    expect(token.image).toBe("brandName");
    token = instance.getNextToken();
    expect(token.image).toBe(":");
    token = instance.getNextToken();
    expect(token.image).toBe("Apacs");
    token = instance.getNextToken();
    expect(token.image).toBe(",");

    token = instance.getNextToken();
    expect(token.image).toBe("manufacturer");
    token = instance.getNextToken();
    expect(token.image).toBe(":");
    token = instance.getNextToken();
    expect(token.image).toBe("APACS AMG Sports WVN Mano 2nd Floor No 62138 Santhome Road Chennai 600004 Contact 8939742090 amgsports2006gmailcom");
    token = instance.getNextToken();
    expect(token.image).toBe(",");

    token = instance.getNextToken();
    expect(token.image).toBe("countryOfOrigin");
    token = instance.getNextToken();
    expect(token.image).toBe(":");
    token = instance.getNextToken();
    expect(token.image).toBe("Thailand");
    token = instance.getNextToken();
    expect(token.image).toBe(",");

    token = instance.getNextToken();
    expect(token.image).toBe("listingStatus");
    token = instance.getNextToken();
    expect(token.image).toBe(":");
    token = instance.getNextToken();
    expect(token.image).toBe("Active");
    token = instance.getNextToken();
    expect(token.image).toBe(",");

    token = instance.getNextToken();
    expect(token.image).toBe("productCategory");
    token = instance.getNextToken();
    expect(token.image).toBe(":");
    token = instance.getNextToken();
    expect(token.image).toBe("/Sports & Fitness/Badminton/Yonex/Racquet");
    token = instance.getNextToken();
    expect(token.image).toBe(",");

    token = instance.getNextToken();
    expect(token.image).toBe("productTaxCode");
    token = instance.getNextToken();
    expect(token.image).toBe(":");
    token = instance.getNextToken();
    expect(token.image).toBe("12");
    token = instance.getNextToken();
    expect(token.image).toBe(",");

    token = instance.getNextToken();
    expect(token.image).toBe("salePrice");
    token = instance.getNextToken();
    expect(token.image).toBe(":");
    token = instance.getNextToken();
    expect(token.image).toBe("1699");
    token = instance.getNextToken();
    expect(token.image).toBe(",");

    token = instance.getNextToken();
    expect(token.image).toBe("stock");
    token = instance.getNextToken();
    expect(token.image).toBe(":");
    token = instance.getNextToken();
    expect(token.image).toBe("0");
    token = instance.getNextToken();
    expect(token.image).toBe(",");

    token = instance.getNextToken();
    expect(token.image).toBe("SEO");
    token = instance.getNextToken();
    expect(token.image).toBe(":");
    token = instance.getNextToken();
    expect(token.image).toBe("null");
    token = instance.getNextToken();
    expect(token.image).toBe(",");

    token = instance.getNextToken();
    expect(token.image).toBe("maxOrderQuantity");
    token = instance.getNextToken();
    expect(token.image).toBe(":");
    token = instance.getNextToken();
    expect(token.image).toBe("1");
    token = instance.getNextToken();
    expect(token.image).toBe(",");

    token = instance.getNextToken();
    expect(token.image).toBe("hsncode");
    token = instance.getNextToken();
    expect(token.image).toBe(":");
    token = instance.getNextToken();
    expect(token.image).toBe("9506");
    token = instance.getNextToken();
    expect(token.image).toBe(",");

    token = instance.getNextToken();
    expect(token.image).toBe("mrp");
    token = instance.getNextToken();
    expect(token.image).toBe(":");
    token = instance.getNextToken();
    expect(token.image).toBe("4299");
    token = instance.getNextToken();
    expect(token.image).toBe(",");

    token = instance.getNextToken();
    expect(token.image).toBe("isHazard");
    token = instance.getNextToken();
    expect(token.image).toBe(":");
    token = instance.getNextToken();
    expect(token.image).toBe("true");
    token = instance.getNextToken();
    expect(token.image).toBe(",");

    token = instance.getNextToken();
    expect(token.image).toBe("searchTerms");
    token = instance.getNextToken();
    expect(token.image).toBe(":");
    token = instance.getNextToken();
    expect(token.image).toBe("APACS Finapi 262 Unstrung Badminton Racquet,apacs badminton racquet,finapi 262");
    token = instance.getNextToken();
    expect(token.image).toBe(",");

    token = instance.getNextToken();
    expect(token.image).toBe("numOfImages");
    token = instance.getNextToken();
    expect(token.image).toBe(":");
    token = instance.getNextToken();
    expect(token.image).toBe("5");
    token = instance.getNextToken();
    expect(token.image).toBe(",");

    token = instance.getNextToken();
    expect(token.image).toBe("productDescription");
    token = instance.getNextToken();
    expect(token.image).toBe(":");
    token = instance.getNextToken();
    expect(token.image).toBe("The use of isometric head frame equalizes the strings in the string bed to deliver perfect shots Aero wide body head helps in faster swing and great feel while smashing The frame and the shaft is made using hi modulus graphite material which offers good strength to the racquet The grip size is g2 which will help in great control The medium stiff flex helps in the delivering powerful shots with brilliant control at the same time The string tension is about 38 lbs with g2 grip size which offers even balance while delivering the shots The length and light weight of these racquets are ideal for perfect swings in all directions");
    token = instance.getNextToken();
    expect(token.image).toBe(",");

    // keyfeatures.
    token = instance.getNextToken();
    expect(token.image).toBe("keyFeatures");
    token = instance.getNextToken();
    expect(token.image).toBe(":");
    token = instance.getNextToken();
    expect(token.image).toBe("[");
    token = instance.getNextToken();
    expect(token.image).toBe("Material: High Modulus Graphite");
    token = instance.getNextToken();
    expect(token.image).toBe(",");
    token = instance.getNextToken();
    expect(token.image).toBe("Weight : 85-87g (4U) || Balance : 285 || Flex : 8.5 || Max Tension : 38 LBS");
    token = instance.getNextToken();
    expect(token.image).toBe(",");
    token = instance.getNextToken();
    expect(token.image).toBe("The use of isometric head frame equalizes the strings in the string bed to deliver perfect shots");
    token = instance.getNextToken();
    expect(token.image).toBe(",");
    token = instance.getNextToken();
    expect(token.image).toBe("Power Frame Series");
    token = instance.getNextToken();
    expect(token.image).toBe(",");
    token = instance.getNextToken();
    expect(token.image).toBe("In-Box Contents: 1 Piece Badminton Racket");
    token = instance.getNextToken();
    expect(token.image).toBe("]");
    token = instance.getNextToken();
    expect(token.image).toBe(",");
    token = instance.getNextToken();
    expect(token.image).toBe("ratings");
    token = instance.getNextToken();
    expect(token.image).toBe(":");
    token = instance.getNextToken();
    expect(token.image).toBe("{");
    token = instance.getNextToken();
    expect(token.image).toBe("fivestar");
    token = instance.getNextToken();
    expect(token.image).toBe(":");
    token = instance.getNextToken();
    expect(token.image).toBe("10");
    token = instance.getNextToken();
    expect(token.image).toBe(",");
    token = instance.getNextToken();
    expect(token.image).toBe("fourstar");
    token = instance.getNextToken();
    expect(token.image).toBe(":");
    token = instance.getNextToken();
    expect(token.image).toBe("5");
    token = instance.getNextToken();
    expect(token.image).toBe(",");
    token = instance.getNextToken();
    expect(token.image).toBe("threestar");
    token = instance.getNextToken();
    expect(token.image).toBe(":");
    token = instance.getNextToken();
    expect(token.image).toBe("5");
    token = instance.getNextToken();
    expect(token.image).toBe(",");
    token = instance.getNextToken();
    expect(token.image).toBe("twostar");
    token = instance.getNextToken();
    expect(token.image).toBe(":");
    token = instance.getNextToken();
    expect(token.image).toBe("0");
    token = instance.getNextToken();
    expect(token.image).toBe(",");
    token = instance.getNextToken();
    expect(token.image).toBe("onestar");
    token = instance.getNextToken();
    expect(token.image).toBe(":");
    token = instance.getNextToken();
    expect(token.image).toBe("0");
    token = instance.getNextToken();
    expect(token.image).toBe(",");
    token = instance.getNextToken();
    expect(token.image).toBe("[");
    token = instance.getNextToken();
    expect(token.image).toBe("{");
    token = instance.getNextToken();
    expect(token.image).toBe("ratings");
    token = instance.getNextToken();
    expect(token.image).toBe(":");
    token = instance.getNextToken();
    expect(token.image).toBe("5");
    token = instance.getNextToken();
    expect(token.image).toBe(",");
    token = instance.getNextToken();
    expect(token.image).toBe("heading");
    token = instance.getNextToken();
    expect(token.image).toBe(":");
    token = instance.getNextToken();
    expect(token.image).toBe("Awesome Product");
    token = instance.getNextToken();
    expect(token.image).toBe(",");
    token = instance.getNextToken();
    expect(token.image).toBe("comment");
    token = instance.getNextToken();
    expect(token.image).toBe(":");
    token = instance.getNextToken();
    expect(token.image).toBe("Excelleent racket");
    token = instance.getNextToken();
    expect(token.image).toBe(",");
    token = instance.getNextToken();
    expect(token.image).toBe("date");
    token = instance.getNextToken();
    expect(token.image).toBe(":");
    token = instance.getNextToken();
    expect(token.image).toBe("19/03/2021");
    token = instance.getNextToken();
    expect(token.image).toBe("}");
    token = instance.getNextToken();
    expect(token.image).toBe(",");
    token = instance.getNextToken();
    expect(token.image).toBe("{");
    token = instance.getNextToken();
    expect(token.image).toBe("ratings");
    token = instance.getNextToken();
    expect(token.image).toBe(":");
    token = instance.getNextToken();
    expect(token.image).toBe("4");
    token = instance.getNextToken();
    expect(token.image).toBe(",");
    token = instance.getNextToken();
    expect(token.image).toBe("heading");
    token = instance.getNextToken();
    expect(token.image).toBe(":");
    token = instance.getNextToken();
    expect(token.image).toBe("...Best racquet in the world");
    token = instance.getNextToken();
    expect(token.image).toBe(",");
    token = instance.getNextToken();
    expect(token.image).toBe("comment");
    token = instance.getNextToken();
    expect(token.image).toBe(":");
    token = instance.getNextToken();
    expect(token.image).toBe("light weight racket good handling Grip size is good for average hands you don't mind price this price is good for this racket");
    token = instance.getNextToken();
    expect(token.image).toBe(",");
    token = instance.getNextToken();
    expect(token.image).toBe("date");
    token = instance.getNextToken();
    expect(token.image).toBe(":");
    token = instance.getNextToken();
    expect(token.image).toBe("19/03/2021");
    token = instance.getNextToken();
    expect(token.image).toBe("}");
    token = instance.getNextToken();
    expect(token.image).toBe(",");
    token = instance.getNextToken();
    expect(token.image).toBe("{");
    token = instance.getNextToken();
    expect(token.image).toBe("ratings");
    token = instance.getNextToken();
    expect(token.image).toBe(":");
    token = instance.getNextToken();
    expect(token.image).toBe("3");
    token = instance.getNextToken();
    expect(token.image).toBe(",");
    token = instance.getNextToken();
    expect(token.image).toBe("heading");
    token = instance.getNextToken();
    expect(token.image).toBe(":");
    token = instance.getNextToken();
    expect(token.image).toBe("Will buy again...");
    token = instance.getNextToken();
    expect(token.image).toBe(",");
    token = instance.getNextToken();
    expect(token.image).toBe("comment");
    token = instance.getNextToken();
    expect(token.image).toBe(":");
    token = instance.getNextToken();
    expect(token.image).toBe("Good Buy will buy again");
    token = instance.getNextToken();
    expect(token.image).toBe(",");
    token = instance.getNextToken();
    expect(token.image).toBe("date");
    token = instance.getNextToken();
    expect(token.image).toBe(":");
    token = instance.getNextToken();
    expect(token.image).toBe("10/01/2021");
    token = instance.getNextToken();
    expect(token.image).toBe("}");
    token = instance.getNextToken();
    expect(token.image).toBe("]");
    token = instance.getNextToken();
    expect(token.image).toBe("}");
    // marketplace
    token = instance.getNextToken();
    expect(token.image).toBe(",");
    token = instance.getNextToken();
    expect(token.image).toBe("marketplace");
    token = instance.getNextToken();
    expect(token.image).toBe(":");
    token = instance.getNextToken();
    expect(token.image).toBe("{");
    token = instance.getNextToken();
    expect(token.image).toBe("amazon");
    token = instance.getNextToken();
    expect(token.image).toBe(":");
    token = instance.getNextToken();
    expect(token.image).toBe("B08HKCCWPD");
    token = instance.getNextToken();
    expect(token.image).toBe(",");
    token = instance.getNextToken();
    expect(token.image).toBe("amazonPrice");
    token = instance.getNextToken();
    expect(token.image).toBe(":");
    token = instance.getNextToken();
    expect(token.image).toBe("1799");
    token = instance.getNextToken();
    expect(token.image).toBe(",");
    token = instance.getNextToken();
    expect(token.image).toBe("flipkart");
    token = instance.getNextToken();
    expect(token.image).toBe(":");
    token = instance.getNextToken();
    expect(token.image).toBe("itme?pid=Naaaaaa");
    token = instance.getNextToken();
    expect(token.image).toBe(",");
    token = instance.getNextToken();
    expect(token.image).toBe("flipkartPrice");
    token = instance.getNextToken();
    expect(token.image).toBe(":");
    token = instance.getNextToken();
    expect(token.image).toBe("1700");
    token = instance.getNextToken();
    expect(token.image).toBe("}");

    
    
    


    //token = instance.getNextToken();
    //expect(token.image).toBe("}");

    
});