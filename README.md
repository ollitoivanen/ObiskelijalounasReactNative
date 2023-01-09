# Opiskelijalounas Åbo for mobile devices.

## Launched on [Google Play](https://play.google.com/store/apps/details?id=com.opiskelijalounas&pli=1)

## What this is

This is a mobile version of [Obiskelijalounas](https://github.com/ollitoivanen/Obiskelijalounas), displaying the menus of student restaurants in Turku, Finland. It was built to make it easier to quickly check the menus of three main lunch providers in the city: Unica, Kårkafeerna and Sodexo.

## How it works

The app fetches the up-to-date menus from [OpiskelijalounasWebFetchAction](https://github.com/ollitoivanen/OpiskelijalounasWebFetchAction). 
The mentioned repository contains a github action that runs every hour fetching menu data from the lunch providers' websites. It then manipulates it to the correct format and pushes it to the
[all_restaurants_menu.json](https://github.com/ollitoivanen/OpiskelijalounasWebFetchAction/blob/main/all_restaurants_menu.json) -file.

When opening the app, a fetch request is made to this JSON file, and the app is populated with up-to-date menus.

