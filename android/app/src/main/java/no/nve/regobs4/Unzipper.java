package no.nve.regobs4;

import com.getcapacitor.JSObject;
import com.getcapacitor.PluginCall;

import net.lingala.zip4j.ZipFile;
import net.lingala.zip4j.exception.ZipException;
import net.lingala.zip4j.progress.ProgressMonitor;

import java.io.File;
import java.io.IOException;
import java.util.Date;

public class Unzipper {

    public void unzipFile(String zipFilePath, String destinationPath, PluginCall call) {
        Date start = new Date();
        String source = zipFilePath;
        String destination = destinationPath;
        String password = call.getString("password", "");

        // Convert capacitor absolute path to native absolute path
        source = convertToNativePath(source);
        destination = convertToNativePath(destination);

        // Validate Inputs
        if (source.equals("")) {
            call.reject("No source specified", ErrorCodes.NO_SOURCE_SPECIFIED);
            return;
        }
        if (destination.equals("")) {
            call.reject("No destination specified", ErrorCodes.NO_DESTINATION_SPECIFIED);
            return;
        }

        File file = new File(source);
        if (!file.exists()) {
            call.reject("File doesn't exist", ErrorCodes.NO_FILE_EXISTS);
            return;
        }

        // Create zip instance
        ZipFile zipFile = new ZipFile(source);

        // Check zip file validity
        if (!zipFile.isValidZipFile()) {
            call.reject("File is corrupted or not valid", ErrorCodes.NO_FILE_VALID);
            return;
        }

        try {
            // Check zip encryption
            boolean isEncrypted = zipFile.isEncrypted();
            if (isEncrypted && password.equals("")) {
                call.reject("Zip is encrypted, specify a password", ErrorCodes.NO_PASSWORD_SPECIFIED);
                return;
            }

            if (isEncrypted) {
                zipFile.setPassword(password.toCharArray());
            }

            File d = new File(destination);
            if (!d.exists()) {
                d.mkdirs();
            }

            zipFile.setRunInThread(true); // Unzip in background

            ProgressMonitor progressMonitor = zipFile.getProgressMonitor();

            while (!progressMonitor.getState().equals(ProgressMonitor.State.READY)) {
                System.out.println("Percentage done: " + progressMonitor.getPercentDone());
                System.out.println("Current file: " + progressMonitor.getFileName());
                System.out.println("Current task: " + progressMonitor.getCurrentTask());

//                try {
//                    Thread.sleep(1000);
//                } catch (InterruptedException e) {
//                    e.printStackTrace();
//                }
            }

            ProgressMonitor.Result progressResult = progressMonitor.getResult();
            if (progressResult != null) {
                if (progressResult.equals(ProgressMonitor.Result.SUCCESS)) {
                    System.out.println("Successfully added folder to zip");
                } else if (progressResult.equals(ProgressMonitor.Result.ERROR)) {
                    System.out.println("Error occurred. Error message: " + progressMonitor.getException().getMessage());
                } else if (progressResult.equals(ProgressMonitor.Result.CANCELLED)) {
                    System.out.println("Task cancelled");
                }
            }

            zipFile.extractAll(destination);
            zipFile.close();

            long timeSpent = new Date().getTime() - start.getTime();

            JSObject ret = new JSObject();
            ret.put("message", ErrorCodes.SUCCESS);
            ret.put("uri", "file://" + destination);
            ret.put("performance", "Unzip of " + zipFile + " finished in " + timeSpent + "ms");
            call.resolve(ret);
        } catch (ZipException e) {
            call.reject("Zip Error Occurred", ErrorCodes.UNKNOWN_ERROR, e);
            e.printStackTrace();
        } catch (IOException e) {
            call.reject("IO Error Occurred", ErrorCodes.UNKNOWN_ERROR, e);
            e.printStackTrace();
        }
    }

    private String convertToNativePath(String capacitorPath) {
        String nativePath = capacitorPath;
        if (capacitorPath.contains("_capacitor_")) {
            nativePath = nativePath.replace("_capacitor_", "");
        }
        if (nativePath.contains("file://")) {
            nativePath = nativePath.replace("file://", "");
        }
        return nativePath;
    }
}
