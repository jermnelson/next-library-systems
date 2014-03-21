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
import os
import sys

from collections import OrderedDict
from flask import abort, Flask, g, jsonify, redirect, render_template, request

app = Flask(__name__)

slides = OrderedDict()
slides['our-future-tracks-the-book'] = {'label': 'Our Future tracks the book',
    'description': """While libraries pre-date the book, for the past few
    centuries as the central repository of monographs for our communities
    dominated our identity. Just in the past ten years has the book started to
    shifting to new, more online forms that split the content from the print
    format."""}
slides['discovery-happens-elsewhere']= {
    'label':'Discovery happens elsewhere&hellip;',
    'description': """First articulated by Lorcan Dempsey in 2007, in 2014 it
    is not as controversial to note that typically patrons use commerical search
    engines, social media, or mobile apps to discover items held by libraries.
    """}
slides['local-is-needed-more-than-ever'] = {'label':"""&hellip;but local is
    needed more than ever""",
    'description': """Library as Publisher, digital repository services, and
    creation spaces all converge on the local collections managed by
    Libraries"""}
slides['beyond-mobile'] = {'label': 'Beyond Mobile',
    'description': """ """}
slides['heads-up-augmented-services'] = {'label': 'Heads up! Augmented Services',
    'description': " "}
slides['back-to-the-future'] = {'label':'Back to the Future?!',
    'description': " "}

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
