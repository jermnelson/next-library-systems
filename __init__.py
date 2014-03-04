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
slides['our-future-tracks-the-book'] = 'Our Future Tracks the book'
slides['discovery-happens-elsewhere']= 'Discovery happens elsewhere...'
slides['but-local-is-needed-more-than-ever'] = '...but local is needed more than ever'
slides['beyond-mobile'] = 'Beyond Mobile'
slides['heads-up-augmented-services'] = 'Heads up! Augmented Services'
slides['back-to-the-future'] = 'Back to the Future?!'

@app.route("/<slide>.html")
def slide(slide):
    return  render_template("{}.html".format(slide),
                            slides=slides)

@app.route("/")
def default():
    return render_template("index.html",
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
