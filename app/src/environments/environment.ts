export const environment = {
    'auth': 'https://auth.bitid.co.za',
    'appId': '000000000000000000000001',
    'socket': 'ws://127.0.0.1:19000',
    'status': 'http://127.0.0.1:19000',
    'production': false,
    'description': 'Status Page',
    'scopes': [
        { 'url': '/store/pages/add', 'role': 5 },
        { 'url': '/store/pages/get', 'role': 5 },
        { 'url': '/store/pages/list', 'role': 5 },
        { 'url': '/store/pages/share', 'role': 5 },
        { 'url': '/store/pages/update', 'role': 5 },
        { 'url': '/store/pages/delete', 'role': 5 },
        { 'url': '/store/pages/unsubscribe', 'role': 5 },
        { 'url': '/store/pages/updatesubscriber', 'role': 5 },

        { 'url': '/store/components/add', 'role': 5 },
        { 'url': '/store/components/get', 'role': 5 },
        { 'url': '/store/components/list', 'role': 5 },
        { 'url': '/store/components/update', 'role': 5 },
        { 'url': '/store/components/delete', 'role': 5 }
    ]
};