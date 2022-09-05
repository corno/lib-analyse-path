import * as pw from "pareto-core-raw"

import * as ap from "../../../pub"

export const _testProject: ap.TDirectory = {
    'type': ["type", {
        'nodesX': pw.wrapRawDictionary<ap.TNode>({
            "f.txt": {
                'type': ["file", {}],
            },
            "td": {
                'type': ["directory", {
                    'type': ["type", {
                        'nodesX': pw.wrapRawDictionary({
                            "f.txt": {
                                'type': ["file", {}],
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
                                'nodesX': pw.wrapRawDictionary({
                                    "f.txt": {
                                        'type': ["file", {}]
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
                        "extensionsX": pw.wrapRawArray([`txt`]),
                        'recursive': true,
                    }]
                }]
            },
            "fddnr": {
                'type': ["directory", {
                    "type": ["files dictionary", {
                        "allow missing extension": false,
                        "extensionsX": pw.wrapRawArray([`txt`]),
                        'recursive': false,
                    }]
                }]
            },
        }),
    }],
}