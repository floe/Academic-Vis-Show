#!/usr/bin/python3

import sys,requests,json

if len(sys.argv) < 3:
    print("\nUsage: openalex_fetch.py <AUTHOR_ORCID> <SUPERVISOR_ORCID>\n")
    exit(1)

author_orcid = sys.argv[1]
supervisor = sys.argv[2]

res = requests.get("https://api.openalex.org/authors/orcid:"+author_orcid)
#print(res,res.text)
author = res.json()

res = requests.get(author["works_api_url"]+"&per_page=200") # request maximum per-page so we don't need to paginate
works = res.json()

# collect previous positions
Mobility = []
for aff in author["affiliations"]:
    position = {
        "Position": "Master/PhD/PostDoc/AsstProf/AssocProf/FullProf", # needs to be manually filled in
        "StartDate": aff["years"][-1],
        "EndDate": aff["years"][0],
        "Location": "TBD", # can be queried from institution["id"] -> geo.city/country
        "Institute": aff["institution"]["display_name"]
    }
    Mobility.insert(0,position)

Works = []
for work in works["results"]:

    with_advisor = "No"
    author_list = ""
    position = 1
    order = 1

    for coauthor in work["authorships"]:
        orcid = str(coauthor["author"]["orcid"])
        if supervisor in orcid:
            with_advisor = "Yes"
        if author_orcid in orcid:
            order = position
        author_list = author_list+", "+str(coauthor["author"]["display_name"])
        position += 1

    publication = {
        "Author": author["display_name"],
        "Title": work["title"],
        "Type": "Paper", # TBD
        "Category": work["primary_location"]["raw_type"],
        "JCName": work["primary_location"]["raw_source_name"],
        "Rating": "/", # TBD
        "Year": work["publication_year"],
        "Month": 1, # TBD
        "Citation": work["cited_by_count"],
        "WithAdvisor": with_advisor,
        "Star": "No", # TBD
        "Order": order,
        "AuthorCount": len(work["authorships"]),
        "Authors": author_list.strip(", ")
    }
    Works.insert(0,publication)

result = {
    "Name": author["display_name"],
    "Age": "30.0", # TBD
    "Research": [ x["display_name"] for x in author["topics"] ],
    "Mobility": Mobility,
    "Publication": Works
}

print(json.dumps(result,indent=2))
#"Mobility": [
