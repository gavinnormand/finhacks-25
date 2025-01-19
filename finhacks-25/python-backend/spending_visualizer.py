import csv
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np
from io import BytesIO
import base64

def visualize_data_for_month(month_data):
    categories = {
        'clothes': {'count': 0, 'total': 0},
        'groceries': {'count': 0, 'total': 0},
        'living expenses': {'count': 0, 'total': 0},
        'travel/transportation': {'count': 0, 'total': 0},
        'savings and investments': {'count': 0, 'total': 0},
        'subscriptions': {'count': 0, 'total': 0},
        'income': {'count': 0, 'total': 0},
        'medical expenses': {'count': 0, 'total': 0},
        'charity': {'count': 0, 'total': 0},
        'church': {'count': 0, 'total': 0},
        'gifts': {'count': 0, 'total': 0},
        'rent': {'count': 0, 'total': 0},
        'utilities': {'count': 0, 'total': 0},
        'food': {'count': 0, 'total': 0},
        'misc.shopping': {'count': 0, 'total': 0},
        'electronics': {'count': 0, 'total': 0}
    }

    for row in month_data:
        category = row[2].lower()
        try:
            spent = float(row[4])
        except ValueError:
            continue

        if category in categories and category != 'income':
            categories[category]['count'] += 1
            categories[category]['total'] += spent

    # Extract category names and totals dynamically
    category_names = [cat.replace("_", " ").capitalize() for cat in categories.keys()]
    category_totals = [data['total'] for data in categories.values()]

    # Pair categories and totals together, then sort by totals
    category_data = sorted(zip(category_names, category_totals), key=lambda x: x[1], reverse=True)
    sorted_categories, sorted_totals = zip(*category_data)

    # Plotting
    plt.figure(figsize=(10, 6))
    plt.title("Spending Breakdown", fontname='Times New Roman', fontsize=20)
    plt.bar(sorted_categories, sorted_totals, color='LightBlue')
    plt.xticks(rotation=25, ha='right', fontname='Times New Roman')
    plt.xlabel("Spending Categories", fontname='Times New Roman')
    plt.ylabel("Amount of Money Spent ($)", fontname='Times New Roman')
    plt.subplots_adjust(left=0.125, right=0.9, top=0.88, bottom=0.2)

    # Save the plot to a BytesIO object
    img_buf = BytesIO()
    plt.savefig(img_buf, format='png')
    plt.close()

    # Encode the image in base64 for easy display in React
    img_buf.seek(0)
    img_base64 = base64.b64encode(img_buf.read()).decode('utf-8')

    return img_base64
