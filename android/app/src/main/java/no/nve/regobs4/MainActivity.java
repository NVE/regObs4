package no.nve.regobs4;

import com.getcapacitor.BridgeActivity;
import android.os.Bundle;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(DownloadAndUnzipPlugin.class);
        super.onCreate(savedInstanceState);
    }
}
