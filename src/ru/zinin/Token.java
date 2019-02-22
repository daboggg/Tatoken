package ru.zinin;


import javax.net.ssl.HttpsURLConnection;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;

public class Token {
    public static void main(String[] args) throws IOException {
        URL url = new URL("https://cloud-api.yandex.net/v1/disk/resources?path=%2F");
        URLConnection urlConn = url.openConnection();
        HttpsURLConnection httpsConn = (HttpsURLConnection) urlConn;
        httpsConn.setRequestMethod("GET");
        httpsConn.setRequestProperty("Authorization", "OAuth AQAAAAAGLQtTAAVUVZEaClXVb0C8hLp8V2S1Uow");
        httpsConn.connect();
        int resCode = httpsConn.getResponseCode();

        System.out.println(resCode);
        System.out.println(httpsConn.getContent().getClass());

        System.out.println(urlConn.getContentType());
        InputStream is = httpsConn.getInputStream();

    }
}
