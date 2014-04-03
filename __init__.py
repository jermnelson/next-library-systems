#-------------------------------------------------------------------------------
# Name:        next_library_systems
# Purpose:     Web presentation for the Colorado Alliance of Research Libraries'
#              Next Gen ILS conference on April 4th, 2014 in Denver, Colorado.
#
# Author:      Jeremy Nelson
#
# Created:     2014-03-03
# Copyright:   (c) Jeremy Nelson, Colorado College 2014
# Licence:     GPLv2
#-------------------------------------------------------------------------------
import datetime
import json
import os
import sys
import urllib2

from collections import OrderedDict
from flask import abort, Flask, g, jsonify, redirect, render_template, request

app = Flask(__name__)
app.debug = True

slides = OrderedDict()
slides['our-future-tracks-the-book'] = {'label': 'Our Future tracks the book',
    'description': """While libraries pre-date the book, for the past few
    centuries as the central repository of monographs for our communities
    dominated our identity. Just in the past ten years has the book started to
    shifting to new, more online forms that split the content from the print
    format."""}

slides['discovery-elsewhere']= {
    'label':"""Discovery happens elsewhere&hellip;""",
    'description': """First articulated by Lorcan Dempsey in 2007, in 2014 it
    is not as controversial to note that typically patrons use commerical search
    engines, social media, or mobile apps to discover items held by libraries.
    """}

slides['local-needed-more-than-ever'] = {
    'label': '&hellip; but local is needed more than ever',
    'description': """ """}

slides['one-approach-to-lib-sys'] = {
    'label': 'One Approach to Future Library Systems'
}

references = []
#intro2libsys_path = "C:\\Users\\jernelson\\Development\\intro2libsys"
intro2libsys_path = "../intro2libsys"
for row in [
    'Article/ask-devops-guest-mobile-first-is-no-longer-enough.json',
    'BlogPosting/catalog-by-design.json',
    'Article/from-push-to-pull.json',
    'Article/library-technology-forecast-for-2014-and-beyond.json',
    'Article/material-addicts-when-open-access-becomes-a-cult.json',
    'Article/post-artifact-books-and-publishing.json',
    'BlogPosting/the-web-scale-university-press.json']:
        thing_type, filename = os.path.split(row)
        resource_path = os.path.join(intro2libsys_path,
            "thing",
            thing_type,
            filename)
        result = json.load(open(resource_path))
        resource = result
        resource['a_name'] = filename.split(".")[0]
        author = result.get('author')
        resource['author'] = []
        for row in author:
            author_key = row.get('@id').split("/")[-1]
            person_path = os.path.join(intro2libsys_path,
                "thing",
                'Person',
                "{}.json".format(author_key))
            author_result = json.load(open(person_path))
            resource['author'].append(str(author_result.get('name')))
        references.append(resource)


@app.route("/<slide>.html")
def slide(slide):
    template = "{}.html".format(slide)
    return  render_template(template,
                            topic=slides[slide],
                            category='topic',
                            slides=slides)

@app.route("/about")
def about():
    return render_template('about.html',
                           category='about',
                           slides=slides)

@app.route("/contact")
def contact():
    return render_template('contact.html',
                           category='contact',
                           slides=slides)

@app.route("/")
def default():
    return render_template("index.html",
                           category='home',
                           slides=slides)

@app.route("/open-badge")
def open_badge():
    return render_template('badge.html',
                           category='topic',
                           slides=slides)

@app.route("/resources")
def resources():
    return render_template('resources.html',
                           category='topic',
                           resources=references,
                           slides=slides)

def main(dev=False):
    host = '0.0.0.0'
    port = 8004
    if dev:
        app.run(
            host=host,
            port=port,
            debug=True)
    else:
        app.run(
            host=host,
            port=port)

if __name__ == '__main__':
    main(True)
