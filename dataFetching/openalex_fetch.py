#!/usr/bin/python3

import sys,requests,json

if len(sys.argv) < 3:
    print("\nUsage: openalex_fetch.py <AUTHOR_ORCID> <SUPERVISOR_ORCID>\n")
    exit(1)

author = sys.argv[1]
supervisor = sys.argv[2]

res = requests.get("https://api.openalex.org/authors/orcid:"+author)
print(res,res.text)
author = res.json()

res = requests.get(author["works_api_url"]+"&per_page=200") # request maximum per-page so we don't need to paginate
works = res.json()

Mobility = []
for aff in author["affiliations"]:
    position = {
        "Position": "Master/PhD/PostDoc/AsstProf/AssocProf/FullProf",
        "StartDate": aff["years"][-1],
        "EndDate": aff["years"][0],
        "Location": "TBD",
        "Institute": aff["institution"]["display_name"]
    }
    Mobility.insert(0,position)

result = {
    "Name": author["display_name"],
    "Age": "30.0", # guess
    "Research": [ x["display_name"] for x in author["topics"] ],
    "Mobility": Mobility
}

print(result)
#"Mobility": [
