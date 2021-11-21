import sqlalchemy as sq
import pandas as pd
from datetime import datetime, timedelta
from datetime import date
import warnings

warnings.filterwarnings('ignore')

message_templates = {
    "ta_d": [
        "We compared general sales to the sales last week and detected a %5.2f %% rise in sales",
        "We compared general sales to the sales last week and detected a %5.2f %% fall in sales",
    ],
    "ta_d_city": [
        "We compared general sales in all stores of the city with Code %s and detected a %5.2f %% rise in sales",
        "We compared general sales in all stores of the city with Code %s and detected a %5.2f %% fall in sales",
    ],
    "ta_d_store": [
        "We compared general sales in the store with Code %s and detected a %5.2f %% rise in sales",
        "We compared general sales in the store with Code %s and detected a %5.2f %% fall in sales",
    ]
}

title_templates = {
    "ta_d": [
        "Sharp %s in overall sales compared to last week",
        "Moderate %s in overall sales compared to last week"
    ]
}

SHARP = 80
MODERATE = 30


def build_return_dictionary(dt, real_percent, category):
    msg_template = message_templates[category]
    title_template = title_templates[category]
    if (category == "ta_d"):
        if (real_percent > 0):
            msg_template = msg_template[0]
            if (real_percent > SHARP):
                title_template = title_template[0] % "increase"
            else:
                title_template = title_template[1] % "increase"
        else:
            msg_template = msg_template[1]
            if (-real_percent > SHARP):
                title_template = title_template[0] % "decrease"
            else:
                title_template = title_template[1] % "decrease"

        return {"title": title_template,
                "message": (msg_template % abs(real_percent)),
                "percent": real_percent,
                "date": dt}
    else:
        return None


def eval_general_sales_prev_week(dt, connection):
    sql = "SELECT date, transaction FROM ta_d WHERE date BETWEEN '" + (
                dt - timedelta(6 + 7)).isoformat() + "' AND '" + dt.isoformat() + "';"
    pdcon = pd.read_sql(
        sql,
        con=connection, parse_dates=["date"],
        columns=["date", "transaction"]
    )
    pd_cw = pdcon.to_dict()
    average_list = [0, 0]
    count = [0, 0]

    for i in range(len(pd_cw["date"])):
        if (date.fromisoformat(str(pd_cw["date"][i])[:10]) >= (dt - timedelta(6))):  # if date lies after one week ago
            average_list[0] += int(pd_cw["transaction"][i])
            count[0] += 1
        else:
            average_list[1] += int(pd_cw["transaction"][i])
            count[1] += 1
    if(count[0]==0 or count[1]==0):
        return None
    average_list[0] /= count[0]
    average_list[1] /= count[1]

    if (average_list[0] == 0 or average_list[1] == 0):
        return None
    real_percent = (1 - (average_list[0] / average_list[1]))* 100

    if (abs(real_percent) < 3):  # insignificant rise/fall
        return None
    else:
        return build_return_dictionary(dt, real_percent, "ta_d")

def eval_general_sales_prev_week_per_city(dt, connection):
    sql = "SELECT date, transaction, city_id FROM ta_d_city WHERE date BETWEEN '" + (
                dt - timedelta(6 + 7)).isoformat() + "' AND '" + dt.isoformat() + "';"
    pdcon = pd.read_sql(
        sql,
        con=connection, parse_dates=["date"],
        columns=["date", "transaction", "city_id"]
    )
    pd_cw = pdcon.to_dict()

    #TODO: create bucket for each city code in the result, compare bucket-wise
    average_list = [0, 0]
    count = [0, 0]

    for i in range(len(pd_cw["date"])):
        if (date.fromisoformat(str(pd_cw["date"][i])[:10]) >= (dt - timedelta(6))):  # if date lies after one week ago
            average_list[0] += int(pd_cw["transaction"][i])
            count[0] += 1
        else:
            average_list[1] += int(pd_cw["transaction"][i])
            count[1] += 1
    if(count[0]==0 or count[1]==0):
        return None
    average_list[0] /= count[0]
    average_list[1] /= count[1]

    if (average_list[0] == 0 or average_list[1] == 0):
        return None
    real_percent = (1 - (average_list[0] / average_list[1]))* 100

    if (abs(real_percent) < 3):  # insignificant rise/fall
        return None
    else:
        return build_return_dictionary(dt, real_percent, "ta_d")

if __name__ == "__main__":
    import view_aggregation as va

    conn = va.init_aggregate_tables_pd()
    dt = date(2017, 8, 5)
    while(eval_general_sales_prev_week(dt, conn) == None):
        print(dt)
        dt = dt+timedelta(1)
    print(eval_general_sales_prev_week(dt, conn))
    va.cleanup(conn)
