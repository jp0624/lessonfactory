import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {GlobalService} from '../services/global.service';

@Injectable()
export class DictionaryService {

  constructor(private http: HttpClient,
              private globalService: GlobalService) {
  }

  findDictionaryTerms(data, dictionary) {
    if (data.length) {
      for (let d_idx in data) {
        for (let s_idx in data[d_idx]) {
          for (let t_idx in data[d_idx][s_idx]) {
            data[d_idx][s_idx][t_idx] = this.replacePattern(data[d_idx][s_idx][t_idx], dictionary);
          }
        }
      }
    }
  }

  replacePattern(string, dictionary) {
    if (!string) {
      return;
    }

    const regex = /((\{\$dt-)\S*(\}))/g;
    const matches = string.match(regex);
    if (!matches) {
      return string;
    }

    for (let i in matches) {
      for (let term of dictionary) {
        if (term.selector === matches[i]) {
          if (term.value !== '') {
            term = term.value;
          } else {
            term = term.term;
          }
          string = string.replace(matches[i], term);
        }
      }
      if (matches[i] === '{$dt-mediaUrl}') {
        string = string.replace(matches[i], this.globalService.assetsurl);
      }
    }

    return string;
  }
}
