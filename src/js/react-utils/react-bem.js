import _ from 'lodash';

let _b = function(bname, ename, mname) {
    if (_.isUndefined(ename)) {
        return bname;
    } else {
        let el = `${bname}__${ename}`
        if (_.isUndefined(mname)) {
            return el;
        } else {
            el = el + ` ${bname}__${ename}--${mname}`
            return el;
        }
    }
}

let _bem = function(bname, ename, mname) {
    return { className: _b(bname, ename, mname) }
}

module.exports = {
    _b, _bem
}
