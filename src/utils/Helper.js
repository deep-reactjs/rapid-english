import { Colors } from "../config/appConstants";

const isValideEmail = (email) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return (true)
    }
    return (false)
}
const formatNumberWithDecimal = (number) => {
    if (number) {
        number = number.toString().split(".");
        return number[0].replace(/(\d)(?=(\d\d)+\d$)/g, "$1,") + (number[1] ? ("." + number[1]) : "");
    } else {
        return 0;
    }
}

const GetNameFromUrl = (url) => {
    url = url.split("/")
    return url[url.length - 1]
}

const randomColor = () => {
    var letters = 'BCDEF'.split('');
    var color = '#';
    var c;
    for (var i = 0; i < 12; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(color)) {
            c = color.substring(1).split('');
            if (c.length == 3) {
                c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c = '0x' + c.join('');
            return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',0.4)';
        }
    }
}

const StatusColor = (value) => {
    let color = ''
    if (value == 'Active') {
        color = Colors.green
    } else if (value == 'InActive') {
        color = Colors.red
    } else {
        color = Colors.black
    }
    return color;
}
export default{
    isValideEmail,
    formatNumberWithDecimal,
    GetNameFromUrl,
    randomColor,
    StatusColor
}