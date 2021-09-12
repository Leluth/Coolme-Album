package com.coolmealbum.utils;

import java.io.*;

public class FileSaver {
    public static void Save(byte[] bytes, String path) throws IOException {
        BufferedOutputStream outputStream=new BufferedOutputStream(new FileOutputStream(path));
        outputStream.write(bytes);
        outputStream.close();
        return;
    }

    public static String Search(String keyword) {
        File dir=new File("src/main/resources/static/images");
        String[] children=dir.list();
        if(children!=null) {
            for (String child: children) {
                if(child.contains(keyword)) {
                    return child;
                }
            }
        }
        return null;
    }
}
