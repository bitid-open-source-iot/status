var components = db.getCollection('tblComponents');
if (components.count() == 0) {
    db.tblComponents.insert({
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
        '_id': ObjectId('000000000000000000000001'),
        'serverDate': ISODate(),
        'description': 'My First Component'
    });
};