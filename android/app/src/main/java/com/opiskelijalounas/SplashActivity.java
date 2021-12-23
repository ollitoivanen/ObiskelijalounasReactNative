package com.opiskelijalounas; // make sure this is your package name

import android.content.Intent;

import androidx.appcompat.app.AppCompatActivity;

import org.devio.rn.splashscreen.SplashScreen;
import android.os.Bundle;


public class SplashActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
        finish();
    }

}