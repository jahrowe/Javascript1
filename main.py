# main.py
import tornado.ioloop
import tornado.web
import os.path 
import sock

HTMLDIR = os.path.abspath(
    os.path.join(
        os.path.dirname(__file__),
        "html"
    )
)

class IndexPage(tornado.web.RequestHandler):
    def get(self):
        self.write("<a href='/static/roulette.html'>VIsit the casino</a>")

def makeApp():
    endpoints = [
        ("/", IndexPage),
        ("/sock", sock.ChatHandler)
    ]
    app = tornado.web.Application(endpoints, static_path=HTMLDIR)
    return app

if __name__ == "__main__":
    app = makeApp()
    app.listen(8000)
    tornado.ioloop.IOLoop.current().start()