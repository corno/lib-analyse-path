import * as pw from "pareto-core-raw"

import * as pub from "../../../pub"

export const data: pub.TDirectory = {
    'type': ["type", {
        'nodes': pw.wrapRawDictionary<pub.TNode>({
            "f.txt": {
                'type': ["file", null],
            },
            "td": {
                'type': ["directory", {
                    'type': ["type", {
                        'nodes': pw.wrapRawDictionary({
                            "f.txt": {
                                'type': ["file", null],
                            }
                        })
                    }]
                }]
            },
            "ddd": {
                'type': ["directory", {
                    "type": ["directory dictionary", {
                        "definition": {
                            "type": ["type", {
                                'nodes': pw.wrapRawDictionary({
                                    "f.txt": {
                                        'type': ["file", null]
                                    }
                                })
                            }]
                        }
                    }]
                }]
            },
            "fdd": {
                'type': ["directory", {
                    "type": ["files dictionary", {
                        "allow missing extension": false,
                        "extensions": pw.wrapRawDictionary({ 'txt': null }),
                        'recursive': true,
                    }]
                }]
            },
            "fddnr": {
                'type': ["directory", {
                    "type": ["files dictionary", {
                        "allow missing extension": false,
                        "extensions": pw.wrapRawDictionary({ 'txt': null }),
                        'recursive': false,
                    }]
                }]
            },
        }),
    }],
}