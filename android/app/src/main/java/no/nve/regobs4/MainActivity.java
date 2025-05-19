package no.nve.regobs4;

import com.getcapacitor.BridgeActivity;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.content.res.Configuration;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(DownloadAndUnzipPlugin.class);
        super.onCreate(savedInstanceState);
        float fontScale = getResources().getConfiguration().fontScale;
        WebView webView = (WebView) this.bridge.getWebView();
        WebSettings webSettings = webView.getSettings();

        // På Android-enheter må vi sørge for at teksten i appen ikke blir større enn 120%,
        // selv om brukeren har valgt en større skrifttype i systeminnstillingene (fontScale > 1.2).
        // Grunnen er at ion-datetime-komponenten (spesielt wheel-visningen) ikke håndterer større tekststørrelser riktig,
        // og det kan føre til at hjulet ikke stopper å rulle når brukeren først begynner å dra. Forskjellige maks
        // zoomer ble testet, og 120 er maks som kan tåles dessverre. 
        if (fontScale > 1.2) {
            webSettings.setTextZoom(120);
        }
    }
}
