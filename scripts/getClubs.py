import csv
import json
import random
from datetime import datetime

def read_csv_and_generate_json(csv_filename, json_filename):
    default_structure = {
        "name": "",
        "description": "",
        "meetingTime": "",
        "location": "",
        "website": "",
        "contactEmail": "",
        "logo": "",
        "startDate": "",
        "expirationDate": "",
        "interestAreas": "",
        "admins": "",
        "members": "",
        "imageLocations": [],
    }

    output_data = {"defaultClubsData": []}

    with open(csv_filename, mode="r", encoding="utf-8-sig") as csv_file:

        reader = csv.DictReader(csv_file)
        index = 0

        for row in reader:

            if index == 100:
                break

            club_data = default_structure.copy()
            club_data["name"] = row.get("OrganizationName", "")
            club_data["description"] = row.get("Description", "")
            effective_date = row.get("Effective", "").strip()
            expiration_date = row.get("Expiration", "").strip()

            try:
                club_data["startDate"] = datetime.strptime(effective_date, "%m/%d/%y").strftime("%Y-%m-%d") if effective_date else "2025-01-01"
                club_data["expirationDate"] = datetime.strptime(expiration_date, "%m/%d/%y").strftime("%Y-%m-%d") if expiration_date else "2027-01-01"
            except:
                continue

            club_data["interestAreas"] = row.get("Interests", "")
            club_data["contactEmail"] = row.get("ContactEmail", "")

            random_day = random.choice(
                ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
            )
            random_hour = random.randint(1, 8)
            club_data["meetingTime"] = (
                f"Every {random_day} at {random_hour} PM Hawaii Time"
            )

            random_room = random.randint(1, 200)
            club_data["location"] = f"Building A Room {random_room}"

            club_data["members"] = "wassup@hawaii.edu,hello@hawaii.edu"
            club_data["logo"] = (
                "https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png"
            )

            club_data["admins"] = random.choice(
                ["wassup@hawaii.edu", "hello@hawaii.edu", "john@hawaii.edu"]
            )

            output_data["defaultClubsData"].append(club_data)

            index += 1

    with open(json_filename, mode="w", encoding="utf-8") as json_file:
        json.dump(output_data, json_file, indent=4, ensure_ascii=False)


csv_filename = f"scripts/ClubData.csv"
json_filename = f"scripts/output.json"
read_csv_and_generate_json(csv_filename, json_filename)
