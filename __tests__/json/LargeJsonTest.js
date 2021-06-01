var logger = require('../../src/logger/logger');

import  JsonMap  from '../../src/json/JsonMap.js';
import  JsonString  from '../../src/json/JsonString.js';
import  JsonNumber  from '../../src/json/JsonNumber.js';
import  JsonNull  from '../../src/json/JsonNull.js';
import  JsonBoolean  from '../../src/json/JsonBoolean.js';
import  JsonList  from '../../src/json/JsonList.js';

const instance = new JsonMap(true,false,new Map());

var appendable = {
    destination : ""
}

beforeEach(() => {
    appendable.destination = "";
    instance.input = new Map();
});

function createRatings() {
    var ratingMap = new JsonMap(false,false,new Map());
    ratingMap.put(new JsonString(false,true,"fivestar"),new JsonString(false,false,"10"));
    ratingMap.put(new JsonString(false,true,"fourstar"),new JsonString(false,false,"10"));
    ratingMap.put(new JsonString(false,true,"threestar"),new JsonString(false,false,"6"));
    ratingMap.put(new JsonString(false,true,"twostar"),new JsonString(false,false,"5"));
    ratingMap.put(new JsonString(false,true,"onestar"),new JsonString(false,false,"0"));

    var reviewsList = new JsonList(false,false,[]);
    var review01Map = new JsonMap(false,false,new Map());
    review01Map.put(new JsonString(false,true,"ratings"),new JsonString(false,false,"5"));
    review01Map.put(new JsonString(false,true,"heading"),new JsonString(false,false,"Awesome Product"));
    review01Map.put(new JsonString(false,true,"comment"),new JsonString(false,false,"Excelleent racket"));
    review01Map.put(new JsonString(false,true,"ratings"),new JsonString(false,false,"19/03/2021"));
    reviewsList.add(review01Map);
    var review02Map = new JsonMap(false,false,new Map());
    review02Map.put(new JsonString(false,true,"ratings"),new JsonString(false,false,"4"));
    review02Map.put(new JsonString(false,true,"heading"),new JsonString(false,false,"...Best racquet in the world"));
    review02Map.put(new JsonString(false,true,"comment"),new JsonString(false,false,"light weight racket good handling Grip size is good for average hands you don't mind price this price is good for this racket"));
    review02Map.put(new JsonString(false,true,"ratings"),new JsonString(false,false,"19/03/2021"));
    reviewsList.add(review02Map);

    var review03Map = new JsonMap(false,false,new Map());
    review03Map.put(new JsonString(false,true,"ratings"),new JsonString(false,false,"3"));
    review03Map.put(new JsonString(false,true,"heading"),new JsonString(false,false,"Will buy again..."));
    review03Map.put(new JsonString(false,true,"comment"),new JsonString(false,false,"Good Buy will buy again"));
    review03Map.put(new JsonString(false,true,"ratings"),new JsonString(false,false,"10/01/2021"));
    reviewsList.add(review03Map);


    ratingMap.put(new JsonString(false,true,"reviews"),reviewsList);
    return ratingMap;
}

test('largeJsonTest', () => {
    var featureList = new JsonList(false,false,[]);
    featureList.add(new JsonString(false,false,"Material: High Modulus Graphite"));
    featureList.add(new JsonString(false,false,"Weight : 85-87g (4U) || Balance : 285 || Flex : 8.5 || Max Tension : 38 LBS"));
    featureList.add(new JsonString(false,false,"The use of isometric head frame equalizes the strings in the string bed to deliver perfect shots"));
    featureList.add(new JsonString(false,false,"Power Frame Series"));
    featureList.add(new JsonString(false,false,"In-Box Contents: 1 Piece Badminton Racket"));
    var featureKey = new JsonString(false,true,"keyFeatures");

    var marketMap = new JsonMap(false,false,new Map());
    marketMap.put(new JsonString(false,true,"amazon"),new JsonString(false,false,"B08HKCCWPD"));
    marketMap.put(new JsonString(false,true,"amazonPrice"),new JsonNumber(false,false,1799));
    marketMap.put(new JsonString(false,true,"flipkart"),new JsonString(false,false,"itme?pid=Naaaaaa"));
    marketMap.put(new JsonString(false,true,"flipkartPrice"),new JsonNumber(false,false,1700));
    var marketKey = new JsonString(false,true,"marketPlace");

    var ratingsKey = new JsonString(false,true,"ratings");

    instance.put(new JsonString(false,true,"productId"),new JsonString(false,false,"0ENJMZAXX2"));
    instance.put(new JsonString(false,true,"Title"),new JsonString(false,false,"APACS Finapi 262 Unstrung Badminton Racquet"));
    instance.put(new JsonString(false,true,"brandName"),new JsonString(false,false,"APACS"));
    instance.put(new JsonString(false,true,"manufacturer"),new JsonString(false,false,"APACS AMG Sports WVN Mano 2nd Floor No 62138 Santhome Road Chennai 600004 Contact 8939742090 amgsports2006gmailcom"));
    instance.put(new JsonString(false,true,"countryOfOrigin"),new JsonString(false,false,"Thailand"));
    instance.put(new JsonString(false,true,"listingStatus"),new JsonString(false,false,"Active"));
    instance.put(new JsonString(false,true,"productCategory"),new JsonString(false,false,"/Sports & Fitness/Badminton/Yonex/Racquet"));
    instance.put(new JsonString(false,true,"productTaxCode"),new JsonNumber(false,false,12));
    instance.put(new JsonString(false,true,"salePrice"),new JsonNumber(false,false,1699));
    instance.put(new JsonString(false,true,"stock"),new JsonNumber(false,false,0));
    instance.put(new JsonString(false,true,"SEO"),new JsonNull(false,false,null));
    instance.put(new JsonString(false,true,"maxOrderQuantity"),new JsonNumber(false,false,1));
    instance.put(new JsonString(false,true,"hsncode"),new JsonNumber(false,false,9506));
    instance.put(new JsonString(false,true,"mrp"),new JsonNumber(false,false,4299));
    instance.put(new JsonString(false,true,"isHazard"),new JsonBoolean(false,false,true));
    instance.put(new JsonString(false,true,"productDescription"),new JsonString(false,false,"The use of isometric head frame equalizes the strings in the string bed to deliver perfect shots Aero wide body head helps in faster swing and great feel while smashing The frame and the shaft is made using hi modulus graphite material which offers good strength to the racquet The grip size is g2 which will help in great control The medium stiff flex helps in the delivering powerful shots with brilliant control at the same time The string tension is about 38 lbs with g2 grip size which offers even balance while delivering the shots The length and light weight of these racquets are ideal for perfect swings in all directions"));
    instance.put(featureKey,featureList);
    instance.put(new JsonString(false,true,"searchTerms"),new JsonString(false,false,"APACS Finapi 262 Unstrung Badminton Racquet,apacs badminton racquet,finapi 262"));
    instance.put(new JsonString(false,true,"numOfImages"),new JsonNumber(false,false,5));
    instance.put(ratingsKey,createRatings());
    instance.put(marketKey,marketMap);
    

    
    instance.formatJsonToString(appendable,-1);
    var expectedList = "\n\t[\n\t\t\"Material: High Modulus Graphite\",\n\t\t\"Power Frame Series\"\n\t]";
    var keyValues = "\n\t\"productId\" : \"0ENJMZAXX2\",\n\t\"Title\" : \"APACS Finapi 262 Unstrung Badminton Racquet\",\n\t";
    var expected = "\n{" + keyValues + "\"keyFeatures\"" + " : " + expectedList + "\n}"; 
    logger.info("actual->" + appendable.destination);
});