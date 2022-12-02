import {Injectable} from '@angular/core';
import xml2js from 'xml2js';

@Injectable()
export class TransformService {
  public convertToJson(data: string): Object {

    let res;
    // setting the explicitArray option prevents an array structure
    xml2js.parseString(data, {explicitArray: false}, (error, result) => {

      if (error) {
        console.error(error);
        throw new Error(error);
      } else {
        res = result;
      }

    });

    return res;
  }

  public convertToXml(rootObject: Object) {
    return new xml2js.Builder().buildObject(rootObject);
  }

}
