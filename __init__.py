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
import hashlib
import json
import os
import sys


# Python 3 hack
try:
    import urllib2
except ImportError:
    import urllib.request as urllib2
import uuid

from collections import OrderedDict
from flask import abort, Flask, g, jsonify, redirect, render_template, request
from flask import Response, url_for

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

if sys.platform == 'win32':
    intro2libsys_path = "C:\\Users\\jernelson\\Development\\intro2libsys"
elif sys.platform.startswith('linux2'):
    intro2libsys_path = "/home/jpnelson/intro2libsys"
elif sys.platform.startswith('darwin'):
    intro2libsys_path = "/Users/jeremynelson/intro2libsys"

identity_salt = 'Alliance Next Gen ILS Badge'
project_root = os.path.abspath(os.path.dirname(__file__))

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


@app.route("/attender-badge.json")
def badge_class():
    return jsonify({"name": "Next Generation ILS Attender Badge",
        "description": """This attender badge was issued by Colorado Alliance of Research Libraries attending Next Gen ILS conference on 4 April 2014.""",
        "image": "http://intro2libsys.info{0}".format(
            url_for('static', filename="img/badge.png")),
        "criteria": "http://intro2libsys.info/next-library-systems-2014/open-badge/",
        "tags": ["Library Systems", "EBook", "Linked Data", "Future technology"],
        "issuer": "http://intro2libsys.info{0}".format(
            url_for('badge_issuer_org'))})

@app.route("/badge-issuer-organization.json")
def badge_issuer_org():
    return jsonify(
        {"name": "Colorado Alliance of Research Libraries",
         "url": "http://coalliance.org",
         "email": "jermnelson@gmail.com",
         "revocationList": "http://intro2libsys.info{0}".format(
             url_for('badge_revoked'))})

@app.route('/revoked.json')
def badge_revoked():
    return jsonify({})

@app.route('/<uid>-attender-badge.json')
def attender_badge(uid):
    badge_location = os.path.join(
        project_root,
        'badges',
        '{0}.json'.format(uid))
    attender_img_location = os.path.join(project_root,
                                         'badges',
                                         'img',
                                         '{0}.png'.format(uid))
    if os.path.exists(badge_location):
        badge = json.load(open(badge_location))
        if os.path.exists(attender_img_location):
            badge['image'] =  'http://intro2libsys.info/next-library-systems-2014/{}-attender-badge.png'.format(uid)
        return jsonify(badge)
    else:
        abort(404)

@app.route('/<uid>-attender-badge.png')
def attender_badge_image(uid):
    attender_img_location = os.path.join(project_root,
                                         'badges',
                                         'img',
                                         '{0}.png'.format(uid))
    if os.path.exists(attender_img_location):
        img = None
        with open(attender_img_location, 'rb') as img_file:
            img = img_file.read()
        return Response(img, mimetype='image/png')
    else:
        abort(404)

def bake_badge(**kwargs):
    assert_url = kwargs.get('url')
    try:
        badge_url = 'http://beta.openbadges.org/baker?assertion={0}'.format(assert_url)
        baking_service = urllib2.urlopen(badge_url)
        raw_image = baking_service.read()
        return raw_image
    except:
        print("Exception occurred: {0}".format(sys.exc_info()))
        return None

def issue_badge(**kwargs):
    identity_hash = hashlib.sha256(kwargs.get("email"))
    identity_hash.update(identity_salt)
    uid = str(uuid.uuid4()).split("-")[0]
    uid_url = 'http://intro2libsys.info/next-library-systems-2014/{}-attender-badge.json'.format(uid)
    print(uid_url)
    badge_json = {
        'badge': "http://intro2libsys.info/next-library-systems-2014/attender-badge.json",
        'issuedOn': kwargs.get('issuedOne', datetime.datetime.now().isoformat()),
        'recipient': {
            'type': "email",
            'hashed': True,
            'salt': identity_salt,
            'identity': "sha256${0}".format(
                identity_hash.hexdigest())},
        'verify': {
            'type': 'hosted',
            'url': uid_url},
        'uid': uid
        }
    # Save badge to badges directory
    json.dump(badge_json,
              open(os.path.join('badges', '{0}.json'.format(uid)), 'wb'),
              indent=2,
              sort_keys=True)
    raw_badge_img = bake_badge(url=uid_url)
    if raw_badge_img:
        with open(os.path.join('badges', 'img', '{0}.png'.format(uid)), 'wb') as img_file:
            img_file.write(raw_badge_img)
        print("Successfully added {0} and badge image".format(uid))
    else:
        print("ERROR unable to issue badge")


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
