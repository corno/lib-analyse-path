import * as pt from 'pareto-core-types'

import * as g_common from "glo-pareto-common"
import * as g_path from "res-pareto-path"

export namespace T {
    
    export namespace AnalysePathData {
        
        export type definition = T.Directory
        
        export type filePath = g_path.T.ParsedFilePath
    }
    
    export type AnalysePathData = {
        readonly 'definition': T.Directory
        readonly 'filePath': g_path.T.ParsedFilePath
    }
    
    export namespace AnalysisResult {
        
        export type error = T.AnnotatedPathError
        
        export namespace success {
            
            export namespace pattern {
                
                export type A = string
            }
            
            export type pattern = pt.Array<string>
        }
        
        export type success = {
            readonly 'pattern': pt.Array<string>
        }
    }
    
    export type AnalysisResult = 
        | ['error', T.AnnotatedPathError]
        | ['success', {
            readonly 'pattern': pt.Array<string>
        }]
    
    export namespace AnnotatedPathError {
        
        export type error = T.PathError
        
        export type path = T.Path
    }
    
    export type AnnotatedPathError = {
        readonly 'error': T.PathError
        readonly 'path': T.Path
    }
    
    export namespace Directory {
        
        export namespace _ltype {
            
            export namespace directory__dictionary {
                
                export type definition = T.Directory
            }
            
            export type directory__dictionary = {
                readonly 'definition': T.Directory
            }
            
            export type files__dictionary = T.FilesDictionary
            
            export type _ltype = T.TypeDirectory
        }
        
        export type _ltype = 
            | ['directory dictionary', {
                readonly 'definition': T.Directory
            }]
            | ['files dictionary', T.FilesDictionary]
            | ['type', T.TypeDirectory]
    }
    
    export type Directory = {
        readonly 'type': 
            | ['directory dictionary', {
                readonly 'definition': T.Directory
            }]
            | ['files dictionary', T.FilesDictionary]
            | ['type', T.TypeDirectory]
    }
    
    export namespace FilesDictionary {
        
        export type allow__missing__extension = boolean
        
        export namespace extensions {
            
            export type D = null
        }
        
        export type extensions = pt.Dictionary<null>
        
        export type recursive = boolean
    }
    
    export type FilesDictionary = {
        readonly 'allow missing extension': boolean
        readonly 'extensions': pt.Dictionary<null>
        readonly 'recursive': boolean
    }
    
    export namespace Node {
        
        export namespace _ltype {
            
            export type directory = T.Directory
            
            export type file = null
        }
        
        export type _ltype = 
            | ['directory', T.Directory]
            | ['file', null]
    }
    
    export type Node = {
        readonly 'type': 
            | ['directory', T.Directory]
            | ['file', null]
    }
    
    export namespace Path {
        
        export type A = string
    }
    
    export type Path = pt.Array<string>
    
    export namespace PathError {
        
        export type did__not__expect__a__directory = null
        
        export type expected__directory___poany__name_pc = null
        
        export type expected__directory__instead__of__file = null
        
        export type expected__file__instead__of__directory = null
        
        export type unexpected__directory = null
        
        export type unexpected__extension = null
        
        export type unexpected__file = null
        
        export type unexpected__missing__extension = null
    }
    
    export type PathError = 
        | ['did not expect a directory', null]
        | ['expected directory (any name)', null]
        | ['expected directory instead of file', null]
        | ['expected file instead of directory', null]
        | ['unexpected directory', null]
        | ['unexpected extension', null]
        | ['unexpected file', null]
        | ['unexpected missing extension', null]
    
    export namespace TypeDirectory {
        
        export namespace nodes {
            
            export type D = T.Node
        }
        
        export type nodes = pt.Dictionary<T.Node>
    }
    
    export type TypeDirectory = {
        readonly 'nodes': pt.Dictionary<T.Node>
    }
}