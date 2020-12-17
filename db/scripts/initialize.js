var reports = db.getCollection("tblReports");
if (reports.count() == 0) {
    db.tblReports.insert({
        "bitid": {
            "auth": {
                "users": [
                    {
                        "role": NumberInt("5"),
                        "email": "xxx@xxx.co.za"
                    }
                ],
                "organizationOnly": NumberInt("0")
            }
        },
        "query": {
            "body": [],
            "method": "GET"
        },
        "_id": ObjectId("000000000000000000000001"),
        "url": "https://...",
        "type": "ds",
        "serverDate": ISODate(),
        "description": "My First Report"
    });
};

var schedule = db.getCollection("tblSchedule");
if (schedule.count() == 0) {
    db.tblSchedule.insert({
        "bitid": {
            "auth": {
                "users": [
                    {
                        "role": NumberInt("5"),
                        "email": "xxx@xxx.co.za"
                    }
                ],
                "organizationOnly": NumberInt("0")
            }
        },
        "trigger": {
            "hour": 0,
            "date": 0,
            "year": 0,
            "month": 0,
            "minute": 0
        },
        "recipients": [
            {
                "email": "xxx@xxx.co.za"
            }
        ],
        "_id": ObjectId("000000000000000000000001"),
        "last": "2020-01-01T00:00:00.000Z",
        "cycle": "daily", // hourly, daily, weekly, monthly, quarterly, bi-annually, annually
        "offset": 0,
        "reportId": "000000000000000000000001",
        "serverDate": ISODate(),
        "description": "My First Report Schedule"
    });
};

var connectors = db.getCollection("tblConnectors");
if (connectors.count() == 0) {
    db.tblConnectors.insert({
        "fields": [
            {
                "key": "deviceDate",
                "type": "date",
                "description": "Device Date"
            },
            {
                "key": "serverDate",
                "type": "date",
                "description": "Server Date"
            },
            {
                "key": "location.latitude",
                "type": "number",
                "description": "Latitude"
            },
            {
                "key": "location.longitude",
                "type": "number",
                "description": "Longitude"
            }
        ],
        "adjust": [
            {
                $unwind: "$inputs"
            }
        ],
        "authenticate": {
            "table": "tblDevices",
            "field": "deviceId"
        },
        "_id": ObjectId("000000000000000000000001"),
        "table": "tblHistorical",
        "database": "telemetry",
        "serverDate": ISODate(),
        "description": "Telemetry Historical Data"
    });
};