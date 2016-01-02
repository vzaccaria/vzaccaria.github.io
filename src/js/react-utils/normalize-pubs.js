import _ from 'lodash'

function processData(p) {
    if (_.isUndefined(p.keyword)) {
        p.keyword = []
    }

    function tkw(k) {
        switch (k) {
            case 'bookc':
                return 'bookchapter';
            case 'journal':
                return 'journal';
            case 'book':
                return 'book';
            case 'conference':
                return 'conference';
            case 'techreport':
                return 'techreport';
            case 'workshop':
                return 'workshop';
            case 'patent':
                return 'patent';
            case 'talk':
                return 'talk';
            case 'forum':
                return 'talk';
            case 'thesis':
                return 'thesis';
            default:
                return undefined;
        }
    }

    let fkw = _.filter(_.map(p.keyword, tkw), (it) => {
        return !_.isUndefined(it);
    });
    p.type = _.first(fkw)
    p.displayAs = p.type

    switch (p.type) {
        case 'techreport':
            p.displayAs = 'workshop';
            break;
        case 'talk':
            p.displayAs = 'workshop';
            break;
        case 'thesis':
            p.displayAs = 'workshop';
            break;

    }

    switch (p.type) {
        case 'journal':
            p.booktitle = p.journal.name;
            break;
        case 'thesis':
            p.booktitle = p.school;
            break;
        case 'techreport':
            p.booktitle = p.institution;
            break;
        case 'patent':
            p.booktitle = `${p.address} ${p.number}`;
            break;
        case 'talk':
            p.booktitle = `${p.address}`;
            break;
    }

    if (_.isUndefined(p.pages)) {
        p.pages = '-';
    }

    if (_.isUndefined(p['bdsk-url-1'])) {
        p.link = {
            url: 'vittorio.zaccaria@polimi.it'
        }
    } else {
        p.link = {
            url: p['bdsk-url-1']
        }
    }

    if (!_.isUndefined(p.booktitle)) {
        var s = p.booktitle
        var n = s.indexOf(':')
        if (n != -1) {
            s = s.substring(0, n)
            p.smartbooktitle = s

        } else {
            p.smartbooktitle = s
        }
    }
    return p;
}


module.exports = {
    processData
}
