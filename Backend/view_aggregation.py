import pandas as pd

from matplotlib import pyplot as plt

import sqlalchemy as sql

credentials = {}

def db_cred_init():
    file = open("db_cred.ignore", mode="r")
    L = []
    for line in file:
        L.append(line[:-1])
    print(L)
    file.close()
    if(len(L)!=5):
        return False

    credentials.update({"domain":L[0]})
    credentials.update({"dbname":L[1]})
    credentials.update({"dbuser":L[2]})
    credentials.update({"dbpass":L[3]})
    credentials.update({"port":L[4]})
    return True

aggregate_tables = {}
views = [
    "ta_d",
    "ta_d_city",
    "ta_d_store",
    "ta_d_pp_h1",
    "ta_d_pp_h2",
    "ta_d_pp_h3",
    "ta_d_pp_h4",
    "ta_d_pp_h5",
    "ta_d_pp_h1_c",
    "ta_d_pp_h2_c",
    "ta_d_pp_h3_c",
    "ta_d_pp_h4_c",
    "ta_d_pp_h5_c"
]

def init_aggregate_tables_pd():
    db_cred_init()
    engine = sql.create_engine("mariadb://"+credentials["dbuser"]
                               +":"+credentials["dbpass"]
                               +"@"+credentials["domain"]
                               +":"+credentials["port"]
                               +"/"+credentials["dbname"])
    connection = engine.connect();
    for view in views:
        aggregate_tables.update({view:pd.read_sql("SELECT * FROM "+view+";",connection)})
    return connection

def cleanup(connection):
    connection.close()