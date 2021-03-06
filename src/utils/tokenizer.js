'use strict';
import _ from 'lodash';

const digit = "\\d+([\\.,_]\\d+)+"
const email = "(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$)"
const web = "^(http[s]?://)?(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+$"
const word = "[aáàạảãăắằặẳẵâấầậẩẫbcdđeéèẹẻẽêếềệểễfghiíìịỉĩjklmnoóòọỏõôồốộổỗơớờợởỡpqrstuúùụủũưứừựửữvwxyýỳỵỷỹzAÁÀẠẢÃĂẮẰẶẲẴÂẤẦẬẨẪBCDĐEÉÈẸẺẼÊẾỀỆỂỄFGHIÍÌỊỈĨJKLMNOÓÒỌỎÕÔỐỒỘỔỖƠỚỜỢỞỠPQRSTUÚÙỤỦŨƯỨỪỰỬỮVWXYÝỲỴỶỸZ0-9]+"
const non_word = "[^aáàạảãăắằặẳẵâấầậẩẫbcdđeéèẹẻẽêếềệểễfghiíìịỉĩjklmnoóòọỏõôồốộổỗơớờợởỡpqrstuúùụủũưứừựửữvwxyýỳỵỷỹzAÁÀẠẢÃĂẮẰẶẲẴÂẤẦẬẨẪBCDĐEÉÈẸẺẼÊẾỀỆỂỄFGHIÍÌỊỈĨJKLMNOÓÒỌỎÕÔỐỒỘỔỖƠỚỜỢỞỠPQRSTUÚÙỤỦŨƯỨỪỰỬỮVWXYÝỲỴỶỸZ0-9\\s]"

const specials = ["==>", "->", "\\.\\.\\.", ">>"]
const datetime = [
    "\\d{1,2}\\/\\d{1,2}(\\/\\d+)?",
    "\\d{1,2}-\\d{1,2}(-\\d+)?",
]
const abbreviations = [
    "[A-ZĐ]+\\.",
    "Tp\\.",
    "Mr\\.", "Mrs\\.", "Ms\\.",
    "Dr\\.", "ThS\\.", "PGS\\.", "GS\\.", "TS\\.", "PTS\\."
]

const patterns = _.concat(abbreviations, specials, [web, email], datetime, [digit, non_word, word])

export default class Tokenizer {
    constructor() {
        this._pattern = `(${ patterns.join('|') })`;
    }

    tokenize(text) {
        let regex = new RegExp(this._pattern, 'g')
        // remove multiple spaces
        text = text.replace(/\s+/, ' ');
        return text.match(regex) || [];
    }
}