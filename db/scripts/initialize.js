var pages = db.getCollection('tblPages');
if (pages.count() == 0) {
    db.tblPages.insert({
        'bitid': {
            'auth': {
                'users': [
                    {
                        'role': NumberInt('5'),
                        'email': 'xxx@xxx.co.za'
                    }
                ],
                'organizationOnly': NumberInt('0')
            }
        },
        'domain': [
            'status.domain.com'
        ],
        '_id': ObjectId('000000000000000000000001'),
        'serverDate': ISODate(),
        'description': 'My First Component'
    });

    db.tblPages.ensureIndex({
        'domain': 1
    }, {
        'unique': true
    });
};

var components = db.getCollection('tblComponents');
if (components.count() == 0) {
    db.tblComponents.insert({
        '_id': ObjectId('000000000000000000000001'),
        'pageId': ObjectId('000000000000000000000001'),
        'serverDate': ISODate(),
        'description': 'My First Component'
    });

    db.tblComponents.ensureIndex({
        'pageId': 1
    }, {
        'unique': false
    });
};

var historical = db.getCollection('tblHistorical');
if (historical.count() == 0) {
    db.tblHistorical.insert({
        'status': {
            'duration': 0,
            'responded': true
        },
        '_id': ObjectId('000000000000000000000001'),
        'date': ISODate(),
        'pageId': ObjectId('000000000000000000000001'),
        'componentId': ObjectId('000000000000000000000001')
    });

    db.tblHistorical.ensureIndex({
        'date': 1,
        'pageId': 1,
        'componentId': 1
    }, {
        'unique': false
    });
};