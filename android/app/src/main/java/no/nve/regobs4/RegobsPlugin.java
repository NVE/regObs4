package no.nve.regobs4;


import android.app.DownloadManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.database.Cursor;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.util.Log;

import androidx.annotation.RequiresApi;

import com.getcapacitor.JSObject;
import com.getcapacitor.Logger;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

@CapacitorPlugin(name = "Regobs")
public class RegobsPlugin extends Plugin {

    private final Unzipper unzipper = new Unzipper();

    @PluginMethod()
    public void echo(PluginCall call) {
        String downloadUrl = call.getString("downloadUrl");
        String destinationPath = call.getString("destinationPath");
        DownloadManager.Request request = new DownloadManager.Request(Uri.parse(downloadUrl));
        request.setTitle("Downloading " + downloadUrl);  //set title for notification in status_bar
        request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);  //flag for if you want to show notification in status or not
        Context context = getContext();
        request.setDestinationInExternalFilesDir(context, Environment.DIRECTORY_DOWNLOADS, "test.zip");
        DownloadManager downloadManager = (DownloadManager) context.getSystemService(Context.DOWNLOAD_SERVICE);
        long downloadedFileId = downloadManager.enqueue(request);

        IntentFilter filter = new IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE);
        BroadcastReceiver receiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
            long reference = intent.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID, -1);
            if (downloadedFileId == reference) {
                openDownloadedAttachment(context, downloadedFileId, destinationPath, call);
            }
            }
        };
        context.registerReceiver(receiver, filter);
        JSObject ret = new JSObject();
        ret.put("value", downloadUrl);

        call.resolve(ret);
    }

    private void openDownloadedAttachment(final Context context, final long downloadId, String destinationPath, PluginCall call) {
        DownloadManager downloadManager = (DownloadManager) context.getSystemService(Context.DOWNLOAD_SERVICE);
        DownloadManager.Query query = new DownloadManager.Query();
        query.setFilterById(downloadId);
        Cursor cursor = downloadManager.query(query);
        if (cursor.moveToFirst()) {
            int downloadStatus = cursor.getInt(cursor.getColumnIndex(DownloadManager.COLUMN_STATUS));
            String downloadLocalUri = cursor.getString(cursor.getColumnIndex(DownloadManager.COLUMN_LOCAL_URI));
            String downloadMimeType = cursor.getString(cursor.getColumnIndex(DownloadManager.COLUMN_MEDIA_TYPE));
            if ((downloadStatus == DownloadManager.STATUS_SUCCESSFUL) && downloadLocalUri != null) {
                Uri uri = Uri.parse(downloadLocalUri);
                String filename = uri.getLastPathSegment();
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
                    destinationPath = context.getDataDir().getAbsolutePath() + "/files/maps";
                }
                unzipWithZip4j(uri.getPath(), destinationPath, call);
            }
        }
        cursor.close();
    }

    private void unzipWithZip4j(String zipFilePath, String destinationPath, PluginCall call) {
        unzipper.unzipFile(zipFilePath, destinationPath, call);
    }

    private void unzip(String zipFile, String location, PluginCall call) throws IOException {
        Date start = new Date();
        try {
            File f = new File(location);
            if (!f.isDirectory()) {
                f.mkdirs();
            }
            ZipInputStream zin = new ZipInputStream(new FileInputStream(zipFile));
            try {
                ZipEntry ze = null;
                while ((ze = zin.getNextEntry()) != null) {
                    String path = location + File.separator + ze.getName();

                    if (ze.isDirectory()) {
                        File unzipFile = new File(path);
                        if (!unzipFile.isDirectory()) {
                            unzipFile.mkdirs();
                        }
                    } else {

                        File unzipFile = new File(path);
                        if (unzipFile.getParentFile() != null && !unzipFile.getParentFile().exists()) {
                            unzipFile.getParentFile().mkdirs();
                        }
                        FileOutputStream fout = new FileOutputStream(path, false);
                        try {
                            for (int c = zin.read(); c != -1; c = zin.read()) {
                                fout.write(c);
                            }
                            zin.closeEntry();
                        } finally {
                            fout.close();
                        }
                    }
                }
            } finally {
                zin.close();
                long timeSpent = new Date().getTime() - start.getTime();
                String message = "Unzip of " + zipFile + " finished in " + timeSpent + "ms";
                Logger.debug(message);
                JSObject result = new JSObject();
                result.put("message", message);
                call.resolve(result);

            }
        } catch (Exception e) {
            e.printStackTrace();
            Logger.error("TODO", "Unzip exception", e);
            call.errorCallback(e.getMessage());
        }
    }
}