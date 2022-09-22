//
//  Regobs.swift
//  App
//
//  Created by Jørgen Loe Kvalberg on 29/04/2022.
//

import Foundation


@objc public class Regobs: NSObject {
    
    public func downloadFile(url: URL) {  // completionHandler: @escaping (URL) -> Void
        
        print("[REGOBS] download: \(url)")
        
        let downloadTask = URLSession.shared.downloadTask(with: url) {
            
            // In an anonymous function, there is no func declaration line - it's anonymous! So we do it with an in line at the start of the body instead.
            // https://stackoverflow.com/a/30379166
            urlOrNil, responseOrNil, errorOrNil in
            
            // check for and handle errors:
            // * errorOrNil should be nil
            // * responseOrNil should be an HTTPURLResponse with statusCode in 200..<299
            
            if let httpResponse = responseOrNil as? HTTPURLResponse {
                print("[REGOBS] Status code: \(httpResponse.statusCode)")
            } else {
                print("[REGOBS] Got an unexpected response")
            }
            
            guard let fileURL = urlOrNil else { return }
            
            do {
                let documentsURL: URL = try FileManager.default.url(for: .documentDirectory, in: .userDomainMask, appropriateFor: nil, create: false)
                let savedURL = documentsURL.appendingPathComponent(url.lastPathComponent)
                try FileManager.default.moveItem(at: fileURL, to: savedURL)
                
                print("[REGOBS] saved file at \(savedURL)")
                // completionHandler(savedURL)
            } catch {
                print ("[REGOBS] file error: \(error)")
            }

        }
        
        // Start the download task
        downloadTask.resume()
        
        
    }
    
}
