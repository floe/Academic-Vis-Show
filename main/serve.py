#!/usr/bin/env python3

from http import server
import os

class MyHTTPRequestHandler(server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Cache-Control", "no-cache")
        super().end_headers()

os.system("(sleep 1; xdg-open http://127.0.0.1:8000/) & disown")
server.test(HandlerClass = MyHTTPRequestHandler)

