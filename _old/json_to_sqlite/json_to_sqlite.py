#!/usr/bin/env python3
# coding: utf-8

import json
import sqlite3
import os
db = os.path.expanduser("~/Desktop/resorts.db")

conn = sqlite3.connect(db)
cursor = conn.cursor()
cursor.execute("DROP TABLE IF EXISTS resorts")
sql = '''CREATE TABLE resorts(
name TEXT,
continent TEXT,
country TEXT,
state_or_province TEXT,
url TEXT,
altitude INTEGER,
easy_total_km INTEGER,
intermediate_total_km INTEGER,
difficult_total_km INTEGER,
number_of_funiculars INTEGER,
number_of_gondolas INTEGER,
number_of_chairlifts INTEGER,
number_of_tbars INTEGER,
number_of_moving_carpets INTEGER,
skipass_price_for_adult INTEGER,
skipass_price_for_youth INTEGER,
skipass_price_for_child INTEGER,
currency TEXT,
rating_resort_size REAL,
rating_slope_variety REAL,
rating_lifts REAL,
rating_snow_reliability REAL,
rating_slope_preparation REAL,
rating_parking_accessibility REAL,
rating_orientation REAL,
rating_cleanliness REAL,
rating_environmentally_friendly REAL,
rating_staff_friendliness REAL,
rating_gastronomy REAL,
rating_apres_ski REAL,
rating_accommodation REAL,
rating_family_friendly REAL,
rating_beginners_friendly REAL,
rating_pro_friendly REAL,
rating_snow_parks REAL,
rating_cross_country_skiing REAL,
number_of_aerial_tramways,
number_of_rope_tows INTEGER,
number_of_people_movers INTEGER,
number_of_gondolas_and_chairs_combined INTEGER,
number_of_cog_railways INTEGER,
number_of_heliskiing_options INTEGER,
number_of_cat_skiing_options INTEGER
)'''
cursor.execute(sql)

with open("/Users/roey/Desktop/resorts.json") as fp:
    json = json.load(fp)["data"]
    for j in json:
        name = j['Resort Name']
        continent = j["Continent"]
        country = j["Country"]
        state_or_province = j['State/Province']
        url = j["URL"]
        altitude = j["Altitude"]
        easy_total_km = j["Easy"]
        intermediate_total_km = j["Intermediate"]
        difficult_total_km = j["Difficult"]
        number_of_funiculars = j["Funicular"]
        number_of_gondolas = j['Circulating ropeway/gondola lift']
        number_of_chairlifts = j["Chairlift"]
        number_of_tbars = j['T-bar lift/platter/button lift']
        number_of_moving_carpets = j['Sunkid Moving Carpet']
        skipass_price_for_adult = j["Adult"]
        skipass_price_for_youth = j["Youth"]
        skipass_price_for_child = j["Child"]
        currency = j["Currency"]
        rating_resort_size = j['Ski resort size']
        rating_slope_variety = j['Slope offering, variety of runs']
        rating_lifts = j['Lifts and cable cars']
        rating_snow_reliability = j['Snow reliability']
        rating_slope_preparation = j['Slope preparation']
        rating_parking_accessibility = j['Access, on-site parking']
        rating_orientation = j['Orientation (trail map, information boards, sign-postings)']
        rating_cleanliness = j['Cleanliness and hygiene']
        rating_environmentally_friendly = j['Environmentally friendly ski operation']
        rating_staff_friendliness = j['Friendliness of staff']
        rating_gastronomy = j['Mountain restaurants, ski huts, gastronomy']
        rating_apres_ski = j['apres-ski']
        rating_accommodation = j['Accommodation offering directly at the slopes and lifts']
        rating_family_friendly = j['Families and children']
        rating_beginners_friendly = j["Beginners"]
        rating_pro_friendly = j['Advanced skiers, freeriders']
        rating_snow_parks = j['Snow parks']
        rating_cross_country_skiing = j['Cross-country skiing and trails']
        number_of_aerial_tramways = j['Aerial tramway/reversible ropeway']
        number_of_rope_tows = j['Rope tow/beginner lift']
        number_of_people_movers = j['People mover']
        number_of_gondolas_and_chairs_combined = j[
            'Combined installation (gondola and chair)']
        number_of_cog_railways = j['Cog railway']
        number_of_heliskiing_options = j['Helicopter for Heli-skiing']
        number_of_cat_skiing_options = j['Snow caterpillars for Cat-skiing']

        # avg_difficulty =
        # avg_rating =

        sql = '''
            INSERT INTO resorts(
                name,
                continent,
                country,
                state_or_province,
                url,
                altitude,
                easy_total_km,
                intermediate_total_km,
                difficult_total_km,
                number_of_funiculars,
                number_of_gondolas,
                number_of_chairlifts,
                number_of_tbars,
                number_of_moving_carpets,
                skipass_price_for_adult,
                skipass_price_for_youth,
                skipass_price_for_child,
                currency,
                rating_resort_size,
                rating_slope_variety,
                rating_lifts,
                rating_snow_reliability,
                rating_slope_preparation,
                rating_parking_accessibility,
                rating_orientation,
                rating_cleanliness,
                rating_environmentally_friendly,
                rating_staff_friendliness,
                rating_gastronomy,
                rating_apres_ski,
                rating_accommodation,
                rating_family_friendly,
                rating_beginners_friendly,
                rating_pro_friendly,
                rating_snow_parks,
                rating_cross_country_skiing,
                number_of_aerial_tramways,
                number_of_rope_tows,
                number_of_people_movers,
                number_of_gondolas_and_chairs_combined,
                number_of_cog_railways,
                number_of_heliskiing_options,
                number_of_cat_skiing_options
            ) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
        '''

        cursor.execute(sql,
                       (name,
                        continent,
                        country,
                        state_or_province,
                        url,
                        altitude,
                        easy_total_km,
                        intermediate_total_km,
                        difficult_total_km,
                        number_of_funiculars,
                        number_of_gondolas,
                        number_of_chairlifts,
                        number_of_tbars,
                        number_of_moving_carpets,
                        skipass_price_for_adult,
                        skipass_price_for_youth,
                        skipass_price_for_child,
                        currency,
                        rating_resort_size,
                        rating_slope_variety,
                        rating_lifts,
                        rating_snow_reliability,
                        rating_slope_preparation,
                        rating_parking_accessibility,
                        rating_orientation,
                        rating_cleanliness,
                        rating_environmentally_friendly,
                        rating_staff_friendliness,
                        rating_gastronomy,
                        rating_apres_ski,
                        rating_accommodation,
                        rating_family_friendly,
                        rating_beginners_friendly,
                        rating_pro_friendly,
                        rating_snow_parks,
                        rating_cross_country_skiing,
                        number_of_aerial_tramways,
                        number_of_rope_tows,
                        number_of_people_movers,
                        number_of_gondolas_and_chairs_combined,
                        number_of_cog_railways,
                        number_of_heliskiing_options,
                        number_of_cat_skiing_options)
                       )

conn.commit()
conn.close()
